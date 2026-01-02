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
  }
}

interface Subscription {
  id: string
  name: string
  price: number
}

describe('Subscriptions API', () => {
  // DB 초기화
  beforeAll(async () => {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
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
        memo TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      )
    `).run()
  })

  describe('GET /subscriptions', () => {
    it('should return empty array initially', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/subscriptions'),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(Array.isArray(data)).toBe(true)
    })
  })

  describe('POST /subscriptions', () => {
    it('should create a new subscription', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: '유튜브 프리미엄',
            price: 14900,
            currency: 'KRW',
            billingCycle: 'monthly',
          }),
        }),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(201)
      const data = (await res.json()) as Subscription
      expect(data.name).toBe('유튜브 프리미엄')
      expect(data.price).toBe(14900)
      expect(data.id).toBeDefined()
    })
  })

  describe('GET /subscriptions/:id', () => {
    it('should return 404 for non-existent subscription', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/subscriptions/non-existent-id'),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(404)
    })

    it('should return subscription by id', async () => {
      // 먼저 구독 생성
      const createCtx = createExecutionContext()
      const createRes = await app.fetch(
        new Request('http://localhost/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Netflix',
            price: 17000,
          }),
        }),
        env,
        createCtx
      )
      await waitOnExecutionContext(createCtx)
      const created = (await createRes.json()) as Subscription

      // 조회
      const getCtx = createExecutionContext()
      const res = await app.fetch(
        new Request(`http://localhost/subscriptions/${created.id}`),
        env,
        getCtx
      )
      await waitOnExecutionContext(getCtx)

      expect(res.status).toBe(200)
      const data = (await res.json()) as Subscription
      expect(data.name).toBe('Netflix')
    })
  })

  describe('PUT /subscriptions/:id', () => {
    it('should update subscription', async () => {
      // 먼저 구독 생성
      const createCtx = createExecutionContext()
      const createRes = await app.fetch(
        new Request('http://localhost/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Spotify',
            price: 10900,
          }),
        }),
        env,
        createCtx
      )
      await waitOnExecutionContext(createCtx)
      const created = (await createRes.json()) as Subscription

      // 수정
      const updateCtx = createExecutionContext()
      const res = await app.fetch(
        new Request(`http://localhost/subscriptions/${created.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price: 11900,
          }),
        }),
        env,
        updateCtx
      )
      await waitOnExecutionContext(updateCtx)

      expect(res.status).toBe(200)
      const data = (await res.json()) as Subscription
      expect(data.price).toBe(11900)
    })

    it('should return 404 for non-existent subscription', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/subscriptions/non-existent-id', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Test' }),
        }),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(404)
    })
  })

  describe('DELETE /subscriptions/:id', () => {
    it('should delete subscription', async () => {
      // 먼저 구독 생성
      const createCtx = createExecutionContext()
      const createRes = await app.fetch(
        new Request('http://localhost/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'To Delete',
            price: 5000,
          }),
        }),
        env,
        createCtx
      )
      await waitOnExecutionContext(createCtx)
      const created = (await createRes.json()) as Subscription

      // 삭제
      const deleteCtx = createExecutionContext()
      const res = await app.fetch(
        new Request(`http://localhost/subscriptions/${created.id}`, {
          method: 'DELETE',
        }),
        env,
        deleteCtx
      )
      await waitOnExecutionContext(deleteCtx)

      expect(res.status).toBe(200)
      const data = (await res.json()) as { success: boolean }
      expect(data.success).toBe(true)

      // 삭제 확인
      const getCtx = createExecutionContext()
      const getRes = await app.fetch(
        new Request(`http://localhost/subscriptions/${created.id}`),
        env,
        getCtx
      )
      await waitOnExecutionContext(getCtx)
      expect(getRes.status).toBe(404)
    })

    it('should return 404 for non-existent subscription', async () => {
      const ctx = createExecutionContext()
      const res = await app.fetch(
        new Request('http://localhost/subscriptions/non-existent-id', {
          method: 'DELETE',
        }),
        env,
        ctx
      )
      await waitOnExecutionContext(ctx)

      expect(res.status).toBe(404)
    })
  })
})
