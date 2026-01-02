import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from 'cloudflare:test'
import { describe, it, expect, beforeAll } from 'vitest'
import app from '../index'

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_REDIRECT_URI: string
  }
}

describe('Auth API', () => {
  beforeAll(async () => {
    // Auth 테이블 초기화
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        picture TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run()
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      )
    `).run()
  })

  describe('GET /auth/login/google', () => {
    it('should redirect to Google OAuth', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/auth/login/google'),
        {
          ...env,
          GOOGLE_CLIENT_ID: 'test-client-id',
          GOOGLE_CLIENT_SECRET: 'test-client-secret',
          GOOGLE_REDIRECT_URI: 'http://localhost:8787/auth/callback/google',
        },
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(302)
      const location = res.headers.get('Location')
      expect(location).toContain('accounts.google.com')
      expect(location).toContain('client_id=test-client-id')
    })

    it('should set OAuth state cookies', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/auth/login/google'),
        {
          ...env,
          GOOGLE_CLIENT_ID: 'test-client-id',
          GOOGLE_CLIENT_SECRET: 'test-client-secret',
          GOOGLE_REDIRECT_URI: 'http://localhost:8787/auth/callback/google',
        },
        ctx
      )
      await waitOnExecutionContext(ctx)

      const cookies = res.headers.get('Set-Cookie')
      expect(cookies).toContain('google_oauth_state')
      expect(cookies).toContain('google_code_verifier')
    })
  })

  describe('GET /auth/callback/google', () => {
    it('should return 400 without code or state', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/auth/callback/google'),
        {
          ...env,
          GOOGLE_CLIENT_ID: 'test-client-id',
          GOOGLE_CLIENT_SECRET: 'test-client-secret',
          GOOGLE_REDIRECT_URI: 'http://localhost:8787/auth/callback/google',
        },
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(400)
      const data = (await res.json()) as { error: string }
      expect(data.error).toBe('Invalid OAuth state')
    })

    it('should return 400 with mismatched state', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request(
          'http://localhost/auth/callback/google?code=test&state=wrong-state',
          {
            headers: {
              Cookie: 'google_oauth_state=different-state; google_code_verifier=verifier',
            },
          }
        ),
        {
          ...env,
          GOOGLE_CLIENT_ID: 'test-client-id',
          GOOGLE_CLIENT_SECRET: 'test-client-secret',
          GOOGLE_REDIRECT_URI: 'http://localhost:8787/auth/callback/google',
        },
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(400)
    })
  })

  describe('GET /auth/me', () => {
    it('should return null user when not authenticated', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/auth/me'),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(200)
      const data = (await res.json()) as { user: null }
      expect(data.user).toBeNull()
    })
  })

  describe('POST /auth/logout', () => {
    it('should return success even when not authenticated', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/auth/logout', { method: 'POST' }),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(200)
      const data = (await res.json()) as { success: boolean }
      expect(data.success).toBe(true)
    })
  })
})
