import { generateCodeVerifier, generateState } from 'arctic';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { generateIdFromEntropySize } from 'lucia';
import { createGoogleAuth, createLucia, scrypt } from '../lib/auth';
import { generateUniqueUsername } from '../lib/username';

type Env = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  FRONTEND_URL: string;
};

export const auth = new Hono<{ Bindings: Env }>();

// Google OAuth 로그인 시작
auth.get('/login/google', async (c) => {
  const google = createGoogleAuth(
    c.env.GOOGLE_CLIENT_ID,
    c.env.GOOGLE_CLIENT_SECRET,
    c.env.GOOGLE_REDIRECT_URI,
  );

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'email',
    'profile',
  ]);

  setCookie(c, 'google_oauth_state', state, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10, // 10분
    sameSite: 'Lax',
    path: '/',
  });

  setCookie(c, 'google_code_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10,
    sameSite: 'Lax',
    path: '/',
  });

  return c.redirect(url.toString());
});

// Google OAuth 콜백
auth.get('/callback/google', async (c) => {
  const code = c.req.query('code');
  const state = c.req.query('state');
  const storedState = getCookie(c, 'google_oauth_state');
  const storedCodeVerifier = getCookie(c, 'google_code_verifier');

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return c.json({ error: 'Invalid OAuth state' }, 400);
  }

  const google = createGoogleAuth(
    c.env.GOOGLE_CLIENT_ID,
    c.env.GOOGLE_CLIENT_SECRET,
    c.env.GOOGLE_REDIRECT_URI,
  );

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const accessToken = tokens.accessToken();

    // Google 사용자 정보 가져오기
    const googleUserRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    const googleUser: {
      id: string;
      email: string;
      name: string;
      picture: string;
    } = await googleUserRes.json();

    const isProduction = c.env.FRONTEND_URL?.includes('sublistme.com') ?? false;
    const lucia = createLucia(c.env.DB, isProduction);

    // 기존 사용자 확인 (google_id 또는 email로)
    let existingUser = await c.env.DB.prepare(
      'SELECT * FROM users WHERE google_id = ?',
    )
      .bind(googleUser.id)
      .first<{ id: string; google_id: string | null }>();

    // google_id로 찾지 못한 경우 email로 확인
    if (!existingUser) {
      existingUser = await c.env.DB.prepare(
        'SELECT * FROM users WHERE email = ?',
      )
        .bind(googleUser.email)
        .first<{ id: string; google_id: string | null }>();
    }

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
      // 사용자 정보 업데이트 (google_id 연결 포함)
      await c.env.DB.prepare(
        'UPDATE users SET google_id = ?, name = ?, picture = ? WHERE id = ?',
      )
        .bind(googleUser.id, googleUser.name, googleUser.picture, userId)
        .run();
    } else {
      // 새 사용자 생성
      userId = generateIdFromEntropySize(10);
      const checkUsernameExists = async (username: string) => {
        const result = await c.env.DB.prepare(
          'SELECT 1 FROM users WHERE username = ?',
        )
          .bind(username)
          .first();
        return !!result;
      };
      const username = await generateUniqueUsername(checkUsernameExists);
      await c.env.DB.prepare(
        'INSERT INTO users (id, google_id, email, username, name, picture) VALUES (?, ?, ?, ?, ?, ?)',
      )
        .bind(
          userId,
          googleUser.id,
          googleUser.email,
          username,
          googleUser.name,
          googleUser.picture,
        )
        .run();
    }

    // 세션 생성
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    });

    // 프론트엔드로 리다이렉트
    const frontendUrl = c.env.FRONTEND_URL || 'http://localhost:3000';
    return c.redirect(frontendUrl);
  } catch (error) {
    console.error('OAuth error:', error);
    return c.json({ error: 'Authentication failed' }, 500);
  }
});

// 로그아웃
auth.post('/logout', async (c) => {
  const isProduction = c.env.FRONTEND_URL?.includes('sublistme.com') ?? false;
  const lucia = createLucia(c.env.DB, isProduction);
  const sessionId = getCookie(c, lucia.sessionCookieName);

  if (sessionId) {
    await lucia.invalidateSession(sessionId);
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    sameSite: 'Lax',
  });

  return c.json({ success: true });
});

// Email 회원가입
auth.post('/signup/email', async (c) => {
  const { email, password, name } = await c.req.json();

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return c.json({ error: 'Invalid input' }, 400);
  }

  if (password.length < 8) {
    return c.json({ error: 'Password must be at least 8 characters' }, 400);
  }

  const hashedPassword = await scrypt.hash(password);
  const userId = generateIdFromEntropySize(10);

  const checkUsernameExists = async (username: string) => {
    const result = await c.env.DB.prepare(
      'SELECT 1 FROM users WHERE username = ?',
    )
      .bind(username)
      .first();
    return !!result;
  };
  const username = await generateUniqueUsername(checkUsernameExists);

  try {
    await c.env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, username, name) VALUES (?, ?, ?, ?, ?)',
    )
      .bind(userId, email, hashedPassword, username, name)
      .run();

    const isProduction = c.env.FRONTEND_URL?.includes('sublistme.com') ?? false;
    const lucia = createLucia(c.env.DB, isProduction);
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    });

    return c.json({ success: true, userId });
  } catch (e) {
    return c.json({ error: 'Email already exists or invalid' }, 400);
  }
});

// Email 로그인
auth.post('/login/email', async (c) => {
  const { email, password } = await c.req.json();

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return c.json({ error: 'Invalid input' }, 400);
  }

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?')
    .bind(email)
    .first<{ id: string; password_hash: string }>();

  if (!user || !user.password_hash) {
    return c.json({ error: 'Invalid email or password' }, 400);
  }

  const validPassword = await scrypt.verify(user.password_hash, password);

  if (!validPassword) {
    return c.json({ error: 'Invalid email or password' }, 400);
  }

  const isProduction = c.env.FRONTEND_URL?.includes('sublistme.com') ?? false;
  const lucia = createLucia(c.env.DB, isProduction);
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  setCookie(c, sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    sameSite: 'Lax',
  });

  return c.json({ success: true });
});

// 현재 사용자 정보
auth.get('/me', async (c) => {
  const isProduction = c.env.FRONTEND_URL?.includes('sublistme.com') ?? false;
  const lucia = createLucia(c.env.DB, isProduction);
  const sessionId = getCookie(c, lucia.sessionCookieName);

  if (!sessionId) {
    return c.json({ user: null });
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    });
    return c.json({ user: null });
  }

  // 세션 갱신이 필요한 경우
  if (session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    });
  }

  return c.json({ user });
});
