import type { Currency, Locale } from '@sublistme/db/schema';
import { users as usersTable } from '@sublistme/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import type { Session, User } from 'lucia';
import type { Env } from '../index';
import { requireAuth } from '../middleware/auth';
import { validateUsername } from '../lib/username';

type Variables = {
  user: User | null;
  session: Session | null;
};

const locales: Locale[] = ['ko', 'en', 'ja'];
const currencies: Currency[] = ['KRW', 'USD', 'JPY', 'EUR'];

export const users = new Hono<{ Bindings: Env; Variables: Variables }>()
  .use('/*', requireAuth)

  .get('/preferences', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const result = await db
      .select({ locale: usersTable.locale, currency: usersTable.currency })
      .from(usersTable)
      .where(eq(usersTable.id, user.id));

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }

    return c.json(result[0]);
  })

  .put('/preferences', async (c) => {
    const user = c.get('user')!;
    const body: Partial<{ locale: Locale; currency: Currency }> =
      await c.req.json();

    const updates: Partial<{ locale: Locale; currency: Currency }> = {};

    if (body.locale) {
      if (!locales.includes(body.locale)) {
        return c.json({ error: 'Invalid locale' }, 400);
      }
      updates.locale = body.locale;
    }

    if (body.currency) {
      if (!currencies.includes(body.currency)) {
        return c.json({ error: 'Invalid currency' }, 400);
      }
      updates.currency = body.currency;
    }

    if (!updates.locale && !updates.currency) {
      return c.json({ error: 'No preferences provided' }, 400);
    }

    const db = drizzle(c.env.DB);
    const result = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, user.id))
      .returning({ locale: usersTable.locale, currency: usersTable.currency });

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }

    return c.json(result[0]);
  })

  // Get current user's username
  .get('/username', async (c) => {
    const user = c.get('user')!;
    const db = drizzle(c.env.DB);
    const result = await db
      .select({ username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.id, user.id));

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }

    return c.json(result[0]);
  })

  // Update username
  .put('/username', async (c) => {
    const user = c.get('user')!;
    const body: { username: string } = await c.req.json();

    if (!body.username) {
      return c.json({ error: 'Username is required' }, 400);
    }

    const normalized = body.username.trim().toLowerCase();
    const validation = validateUsername(normalized);

    if (!validation.valid) {
      return c.json({ error: validation.error }, 400);
    }

    const db = drizzle(c.env.DB);

    // Check if username is already taken by another user
    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.username, normalized));

    if (existing.length > 0 && existing[0]?.id !== user.id) {
      return c.json({ error: 'Username is already taken' }, 409);
    }

    const result = await db
      .update(usersTable)
      .set({ username: normalized })
      .where(eq(usersTable.id, user.id))
      .returning({ username: usersTable.username });

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404);
    }

    return c.json(result[0]);
  })

  // Check username availability
  .get('/username/check', async (c) => {
    const username = c.req.query('username');
    const user = c.get('user')!;

    if (!username) {
      return c.json({ error: 'Username is required' }, 400);
    }

    const normalized = username.trim().toLowerCase();
    const validation = validateUsername(normalized);

    if (!validation.valid) {
      return c.json({ available: false, error: validation.error });
    }

    const db = drizzle(c.env.DB);
    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.username, normalized));

    // Available if no one has it, or if the current user already has it
    const available =
      existing.length === 0 || existing[0]?.id === user.id;

    return c.json({ available });
  });
