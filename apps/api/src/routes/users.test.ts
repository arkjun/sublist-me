import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from 'cloudflare:test'
import { describe, it, expect, beforeAll } from 'vitest'
import app from '../index'
import { createLucia } from '../lib/auth'

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database
  }
}

let sessionCookieName = ''
let sessionCookieValue = ''

describe('User Preferences API', () => {
  beforeAll(async () => {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        picture TEXT,
        password_hash TEXT,
        locale TEXT NOT NULL DEFAULT 'ko',
        currency TEXT NOT NULL DEFAULT 'KRW',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `).run()

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      )
    `).run()

    const userId = 'user-preferences-1'
    await env.DB.prepare(
      'INSERT INTO users (id, google_id, email, name, picture, password_hash, locale, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
      .bind(userId, 'google-1', 'prefs@example.com', 'Prefs User', null, null, 'ko', 'KRW')
      .run()

    const lucia = createLucia(env.DB)
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    sessionCookieName = sessionCookie.name
    sessionCookieValue = sessionCookie.value
  })

  it('GET /users/preferences returns current preferences', async () => {
    const ctx = createExecutionContext()
    const res = await app.fetch(
      new Request('http://localhost/users/preferences', {
        headers: {
          Cookie: `${sessionCookieName}=${sessionCookieValue}`,
        },
      }),
      env,
      ctx
    )
    await waitOnExecutionContext(ctx)

    expect(res.status).toBe(200)
    const data = (await res.json()) as { locale: string; currency: string }
    expect(data.locale).toBe('ko')
    expect(data.currency).toBe('KRW')
  })

  it('PUT /users/preferences updates preferences', async () => {
    const ctx = createExecutionContext()
    const res = await app.fetch(
      new Request('http://localhost/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${sessionCookieName}=${sessionCookieValue}`,
        },
        body: JSON.stringify({ locale: 'ja', currency: 'JPY' }),
      }),
      env,
      ctx
    )
    await waitOnExecutionContext(ctx)

    expect(res.status).toBe(200)
    const data = (await res.json()) as { locale: string; currency: string }
    expect(data.locale).toBe('ja')
    expect(data.currency).toBe('JPY')
  })

  it('PUT /users/preferences rejects invalid currency', async () => {
    const ctx = createExecutionContext()
    const res = await app.fetch(
      new Request('http://localhost/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${sessionCookieName}=${sessionCookieValue}`,
        },
        body: JSON.stringify({ currency: 'ABC' }),
      }),
      env,
      ctx
    )
    await waitOnExecutionContext(ctx)

    expect(res.status).toBe(400)
  })
})
