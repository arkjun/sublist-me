import { zValidator } from '@hono/zod-validator';
import { subscriptions as subscriptionsTable } from '@sublistme/db/schema';
import { and, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import type { Session, User } from 'lucia';
import { z } from 'zod';
import type { Env } from '../index';
import { requireAuth } from '../middleware/auth';
import type { DbVariables } from '../middleware/db';

type Variables = {
  user: User | null;
  session: Session | null;
} & DbVariables;

const subscriptionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  currency: z.enum(['KRW', 'USD', 'JPY', 'EUR']).default('KRW'),
  billingCycle: z
    .enum(['monthly', 'yearly', 'weekly', 'quarterly'])
    .default('monthly'),
  nextBillingDate: z.string().optional(),
  startDate: z.string().optional(),
  country: z.string().default('KR'),
  category: z
    .enum([
      'ott',
      'music',
      'gaming',
      'shopping',
      'productivity',
      'cloud',
      'news',
      'fitness',
      'education',
      'finance',
      'food',
      'security',
      'other',
    ])
    .optional(),
  url: z.string().optional(),
  logoUrl: z.string().optional(),
  memo: z.string().optional(),
  isActive: z.boolean().default(true),
});

const updateSubscriptionSchema = subscriptionSchema.partial();

const bulkSubscriptionSchema = z.object({
  subscriptions: z.array(subscriptionSchema),
});

export const subscriptions = new Hono<{ Bindings: Env; Variables: Variables }>()
  // 모든 구독 라우트에 인증 필수
  .use('/*', requireAuth)

  // 구독 목록 조회 (사용자별)
  .get('/', async (c) => {
    const user = c.get('user')!;
    const db = c.get('db');
    const result = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, user.id));
    return c.json(result);
  })

  // 구독 상세 조회 (사용자별)
  .get('/:id', async (c) => {
    const user = c.get('user')!;
    const db = c.get('db');
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
  .post('/', zValidator('json', subscriptionSchema), async (c) => {
    const user = c.get('user')!;
    const db = c.get('db');
    const body = c.req.valid('json');
    const result = await db
      .insert(subscriptionsTable)
      .values({ ...body, userId: user.id })
      .returning();
    return c.json(result[0], 201);
  })

  // 구독 일괄 생성 (다건)
  .post('/bulk', zValidator('json', bulkSubscriptionSchema), async (c) => {
    const user = c.get('user')!;
    const db = c.get('db');
    const { subscriptions } = c.req.valid('json');

    if (subscriptions.length === 0) {
      return c.json({ error: 'No subscriptions provided' }, 400);
    }

    const subscriptionsToInsert = subscriptions.map((s) => ({
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
  .put('/:id', zValidator('json', updateSubscriptionSchema), async (c) => {
    const user = c.get('user')!;
    const db = c.get('db');
    const id = c.req.param('id');
    const body = c.req.valid('json');
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
    const db = c.get('db');
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
