import { subscriptions as subscriptionsTable } from '@sublistme/db/schema';
import type { SubscriptionInput } from '@sublistme/db/types';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import type { Session, User } from 'lucia';
import type { Env } from '../index';
import { requireAuth } from '../middleware/auth';

type Variables = {
  user: User | null;
  session: Session | null;
};

export const subscriptions = new Hono<{ Bindings: Env; Variables: Variables }>()
  // 모든 구독 라우트에 인증 필수
  .use('/*', requireAuth)

  // 구독 목록 조회 (사용자별)
  .get('/', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const result = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, user.id));
    return c.json(result);
  })

  // 구독 상세 조회 (사용자별)
  .get('/:id', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const id = c.req.param('id');
    const result = await db
      .select()
      .from(subscriptionsTable)
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      );

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }
    return c.json(result[0]);
  })

  // 구독 생성 (사용자 ID 자동 추가)
  .post('/', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const body = await c.req.json();
    const result = await db
      .insert(subscriptionsTable)
      .values({ ...body, userId: user.id })
      .returning();
    return c.json(result[0], 201);
  })

  // 구독 일괄 생성 (다건)
  .post('/bulk', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const body = await c.req.json<{ subscriptions: SubscriptionInput[] }>();

    if (!body.subscriptions || !Array.isArray(body.subscriptions)) {
      return c.json({ error: 'Invalid request body' }, 400);
    }

    if (body.subscriptions.length === 0) {
      return c.json({ error: 'No subscriptions provided' }, 400);
    }

    const subscriptionsToInsert = body.subscriptions.map((s) => ({
      ...s,
      userId: user.id,
    }));

    const result = await db
      .insert(subscriptionsTable)
      .values(subscriptionsToInsert)
      .returning();

    return c.json(result, 201);
  })

  // 구독 수정 (사용자별)
  .put('/:id', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const id = c.req.param('id');
    const body = await c.req.json();
    const result = await db
      .update(subscriptionsTable)
      .set(body)
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      )
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }
    return c.json(result[0]);
  })

  // 구독 삭제 (사용자별)
  .delete('/:id', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const id = c.req.param('id');
    const result = await db
      .delete(subscriptionsTable)
      .where(
        and(
          eq(subscriptionsTable.id, id),
          eq(subscriptionsTable.userId, user.id),
        ),
      )
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }
    return c.json({ success: true });
  });
