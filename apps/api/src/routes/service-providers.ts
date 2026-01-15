import { serviceProviders as serviceProvidersTable } from '@sublistme/db/schema';
import { asc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import type { Session, User } from 'lucia';
import type { Env } from '../index';
import { requireAuth } from '../middleware/auth';

type Variables = {
  user: User | null;
  session: Session | null;
};

export const serviceProviders = new Hono<{
  Bindings: Env;
  Variables: Variables;
}>()
  .use('/*', requireAuth)
  .get('/', async (c) => {
    const db = drizzle(c.env.DB);
    const providers = await db
      .select()
      .from(serviceProvidersTable)
      .orderBy(asc(serviceProvidersTable.slug));

    return c.json(providers);
  });
