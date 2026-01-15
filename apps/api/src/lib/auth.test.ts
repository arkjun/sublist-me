import { env } from 'cloudflare:test';
import { beforeAll, describe, expect, it } from 'vitest';
import { createGoogleAuth, createLucia, scrypt } from './auth';

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database;
  }
}

describe('Auth Library', () => {
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
  });

  describe('createLucia', () => {
    it('should create a Lucia instance', () => {
      const lucia = createLucia(env.DB);
      expect(lucia).toBeDefined();
      expect(lucia.sessionCookieName).toBe('auth_session');
    });

    it('should have proper session cookie attributes', () => {
      const lucia = createLucia(env.DB);
      expect(lucia.sessionCookieName).toBeDefined();
    });

    it('should be able to create and validate sessions', async () => {
      // 테스트 사용자 생성
      const userId = 'test-user-lucia-' + Date.now();
      await env.DB.prepare(
        'INSERT INTO users (id, google_id, email, name) VALUES (?, ?, ?, ?)',
      )
        .bind(userId, 'google-' + Date.now(), `lucia-${Date.now()}@test.com`, 'Test User')
        .run();

      const lucia = createLucia(env.DB);

      // 세션 생성
      const session = await lucia.createSession(userId, {});
      expect(session).toBeDefined();
      expect(session.id).toBeDefined();
      expect(session.userId).toBe(userId);

      // 세션 검증
      const result = await lucia.validateSession(session.id);
      expect(result.session).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user?.id).toBe(userId);
    });

    it('should invalidate session properly', async () => {
      // 테스트 사용자 생성
      const userId = 'test-user-invalidate-' + Date.now();
      await env.DB.prepare(
        'INSERT INTO users (id, google_id, email, name) VALUES (?, ?, ?, ?)',
      )
        .bind(userId, 'google-inv-' + Date.now(), `invalidate-${Date.now()}@test.com`, 'Test User')
        .run();

      const lucia = createLucia(env.DB);
      const session = await lucia.createSession(userId, {});

      // 세션 무효화
      await lucia.invalidateSession(session.id);

      // 무효화된 세션 검증
      const result = await lucia.validateSession(session.id);
      expect(result.session).toBeNull();
      expect(result.user).toBeNull();
    });

    it('should return null for non-existent session', async () => {
      const lucia = createLucia(env.DB);
      const result = await lucia.validateSession('non-existent-session-id');
      expect(result.session).toBeNull();
      expect(result.user).toBeNull();
    });
  });

  describe('createGoogleAuth', () => {
    it('should create a Google OAuth instance', () => {
      const google = createGoogleAuth(
        'test-client-id',
        'test-client-secret',
        'http://localhost/callback',
      );
      expect(google).toBeDefined();
    });

    it('should be able to create authorization URL', () => {
      const google = createGoogleAuth(
        'test-client-id',
        'test-client-secret',
        'http://localhost/callback',
      );

      // Arctic Google provider has createAuthorizationURL method
      expect(typeof google.createAuthorizationURL).toBe('function');
    });
  });

  describe('scrypt', () => {
    it('should hash password', async () => {
      const password = 'test-password-123';
      const hash = await scrypt.hash(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should verify correct password', async () => {
      const password = 'correct-password';
      const hash = await scrypt.hash(password);

      const isValid = await scrypt.verify(hash, password);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'correct-password';
      const hash = await scrypt.hash(password);

      const isValid = await scrypt.verify(hash, 'wrong-password');
      expect(isValid).toBe(false);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'same-password';
      const hash1 = await scrypt.hash(password);
      const hash2 = await scrypt.hash(password);

      // 솔트가 다르므로 해시도 달라야 함
      expect(hash1).not.toBe(hash2);

      // 둘 다 원본 비밀번호로 검증 가능해야 함
      expect(await scrypt.verify(hash1, password)).toBe(true);
      expect(await scrypt.verify(hash2, password)).toBe(true);
    });
  });
});
