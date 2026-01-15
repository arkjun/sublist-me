import {
  createExecutionContext,
  env,
  waitOnExecutionContext,
} from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import app from '../index';
import { createLucia } from '../lib/auth';

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database;
  }
}

describe('Auth Middleware', () => {
  let sessionCookieName = '';
  let validSessionCookieValue = '';

  beforeAll(async () => {
    // 테이블 초기화
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        picture TEXT,
        password_hash TEXT,
        locale TEXT DEFAULT 'ko',
        currency TEXT DEFAULT 'KRW',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run();

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      )
    `).run();

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        original_price REAL,
        currency TEXT DEFAULT 'KRW',
        billing_cycle TEXT DEFAULT 'monthly',
        next_billing_date TEXT,
        start_date TEXT,
        country TEXT DEFAULT 'KR',
        category TEXT,
        url TEXT,
        logo_url TEXT,
        memo TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run();

    // 테스트 사용자 생성
    const userId = 'test-user-middleware';
    await env.DB.prepare(
      'INSERT INTO users (id, google_id, email, name, picture, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
    )
      .bind(
        userId,
        'google-middleware',
        'middleware@example.com',
        'Middleware User',
        null,
        null,
      )
      .run();

    // 세션 생성
    const lucia = createLucia(env.DB);
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    sessionCookieName = sessionCookie.name;
    validSessionCookieValue = sessionCookie.value;
  });

  describe('sessionMiddleware', () => {
    it('should set user and session to null when no cookie provided', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/auth/me'),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(200);
      const data = (await res.json()) as { user: null };
      expect(data.user).toBeNull();
    });

    it('should set user and session when valid session cookie provided', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/auth/me', {
          headers: {
            Cookie: `${sessionCookieName}=${validSessionCookieValue}`,
          },
        }),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(200);
      const data = (await res.json()) as {
        user: { email: string; name: string };
      };
      expect(data.user).not.toBeNull();
      expect(data.user.email).toBe('middleware@example.com');
    });

    it('should handle invalid session cookie gracefully', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/auth/me', {
          headers: {
            Cookie: `${sessionCookieName}=invalid-session-id`,
          },
        }),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(200);
      const data = (await res.json()) as { user: null };
      expect(data.user).toBeNull();
    });

    it('should set blank cookie for invalid session', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/auth/me', {
          headers: {
            Cookie: `${sessionCookieName}=invalid-session-id`,
          },
        }),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      const setCookie = res.headers.get('Set-Cookie');
      expect(setCookie).toContain(sessionCookieName);
    });
  });

  describe('requireAuth', () => {
    it('should return 401 when not authenticated', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/subscriptions'),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(401);
      const data = (await res.json()) as { error: string };
      expect(data.error).toBe('Unauthorized');
    });

    it('should allow access when authenticated', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/subscriptions', {
          headers: {
            Cookie: `${sessionCookieName}=${validSessionCookieValue}`,
          },
        }),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(200);
    });

    it('should return 401 with invalid session cookie', async () => {
      const ctx = createExecutionContext();
      const res = await app.fetch(
        new Request('http://localhost/subscriptions', {
          headers: {
            Cookie: `${sessionCookieName}=expired-or-invalid`,
          },
        }),
        env,
        ctx,
      );
      await waitOnExecutionContext(ctx);

      expect(res.status).toBe(401);
    });
  });
});
