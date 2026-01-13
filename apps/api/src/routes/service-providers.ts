import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { asc } from 'drizzle-orm'
import { serviceProviders as serviceProvidersTable } from '@sublistme/db/schema'
import type { Env } from '../index'
import { requireAuth } from '../middleware/auth'
import type { User, Session } from 'lucia'

type Variables = {
  user: User | null
  session: Session | null
}

export const serviceProviders = new Hono<{ Bindings: Env; Variables: Variables }>()
  .use('/*', requireAuth)
  .get('/', async (c) => {
    const db = drizzle(c.env.DB)
    const providers = await db
      .select()
      .from(serviceProvidersTable)
      .orderBy(asc(serviceProvidersTable.slug))

    return c.json(providers)
  })
