import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { subscriptions as subscriptionsTable } from '@magami/db/schema'
import { eq } from 'drizzle-orm'
import type { Env } from '../index'

export const subscriptions = new Hono<{ Bindings: Env }>()
  // 구독 목록 조회
  .get('/', async (c) => {
    const db = drizzle(c.env.DB)
    const result = await db.select().from(subscriptionsTable)
    return c.json(result)
  })

  // 구독 상세 조회
  .get('/:id', async (c) => {
    const db = drizzle(c.env.DB)
    const id = c.req.param('id')
    const result = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.id, id))

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404)
    }
    return c.json(result[0])
  })

  // 구독 생성
  .post('/', async (c) => {
    const db = drizzle(c.env.DB)
    const body = await c.req.json()
    const result = await db
      .insert(subscriptionsTable)
      .values(body)
      .returning()
    return c.json(result[0], 201)
  })

  // 구독 수정
  .put('/:id', async (c) => {
    const db = drizzle(c.env.DB)
    const id = c.req.param('id')
    const body = await c.req.json()
    const result = await db
      .update(subscriptionsTable)
      .set(body)
      .where(eq(subscriptionsTable.id, id))
      .returning()

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404)
    }
    return c.json(result[0])
  })

  // 구독 삭제
  .delete('/:id', async (c) => {
    const db = drizzle(c.env.DB)
    const id = c.req.param('id')
    const result = await db
      .delete(subscriptionsTable)
      .where(eq(subscriptionsTable.id, id))
      .returning()

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404)
    }
    return c.json({ success: true })
  })
