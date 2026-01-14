import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { users as usersTable } from '@sublistme/db/schema'
import type { Env } from '../index'
import { requireAuth } from '../middleware/auth'
import type { User, Session } from 'lucia'
import type { Currency, Locale } from '@sublistme/db/schema'

type Variables = {
  user: User | null
  session: Session | null
}

const locales: Locale[] = ['ko', 'en', 'ja']
const currencies: Currency[] = ['KRW', 'USD', 'JPY', 'EUR']

export const users = new Hono<{ Bindings: Env; Variables: Variables }>()
  .use('/*', requireAuth)

  .get('/preferences', async (c) => {
    const user = c.get('user')!
    const db = drizzle(c.env.DB)
    const result = await db
      .select({ locale: usersTable.locale, currency: usersTable.currency })
      .from(usersTable)
      .where(eq(usersTable.id, user.id))

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404)
    }

    return c.json(result[0])
  })

  .put('/preferences', async (c) => {
    const user = c.get('user')!
    const body: Partial<{ locale: Locale; currency: Currency }> = await c.req.json()

    const updates: Partial<{ locale: Locale; currency: Currency }> = {}

    if (body.locale) {
      if (!locales.includes(body.locale)) {
        return c.json({ error: 'Invalid locale' }, 400)
      }
      updates.locale = body.locale
    }

    if (body.currency) {
      if (!currencies.includes(body.currency)) {
        return c.json({ error: 'Invalid currency' }, 400)
      }
      updates.currency = body.currency
    }

    if (!updates.locale && !updates.currency) {
      return c.json({ error: 'No preferences provided' }, 400)
    }

    const db = drizzle(c.env.DB)
    const result = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, user.id))
      .returning({ locale: usersTable.locale, currency: usersTable.currency })

    if (result.length === 0) {
      return c.json({ error: 'Not found' }, 404)
    }

    return c.json(result[0])
  })
