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

let sessionCookieName = '';
let sessionCookieValue = '';

describe('Service providers API', () => {
  beforeAll(async () => {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_id TEXT UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        picture TEXT,
        password_hash TEXT,
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
      CREATE TABLE IF NOT EXISTS service_providers (
        id TEXT PRIMARY KEY NOT NULL,
        slug TEXT NOT NULL,
        names TEXT NOT NULL,
        url TEXT,
        logo_url TEXT,
        categories TEXT,
        created_at TEXT DEFAULT (datetime('now')) NOT NULL,
        updated_at TEXT DEFAULT (datetime('now')) NOT NULL
      )
    `).run();

    await env.DB.prepare(
      'INSERT INTO service_providers (id, slug, names, url, logo_url, categories) VALUES (?, ?, ?, ?, ?, ?)',
    )
      .bind(
        'provider-1',
        'netflix',
        JSON.stringify({ ko: '넷플릭스', en: 'Netflix' }),
        'https://netflix.com',
        'https://netflix.com/logo.png',
        JSON.stringify(['ott']),
      )
      .run();

    const userId = 'user-1';
    await env.DB.prepare(
      'INSERT INTO users (id, google_id, email, name, picture, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
    )
      .bind(userId, 'google-1', 'test@example.com', 'Test User', null, null)
      .run();

    const lucia = createLucia(env.DB);
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    sessionCookieName = sessionCookie.name;
    sessionCookieValue = sessionCookie.value;
  });

  it('should return service providers for authenticated user', async () => {
    const ctx = createExecutionContext();
    const res = await app.fetch(
      new Request('http://localhost/service-providers', {
        headers: {
          Cookie: `${sessionCookieName}=${sessionCookieValue}`,
        },
      }),
      env,
      ctx,
    );
    await waitOnExecutionContext(ctx);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    if (Array.isArray(data)) {
      expect(data.length).toBeGreaterThan(0);
    }
  });
});
