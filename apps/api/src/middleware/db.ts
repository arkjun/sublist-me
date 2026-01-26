import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';
import type { Env } from '../index';

export type DbVariables = {
  db: DrizzleD1Database;
};

export const dbMiddleware = createMiddleware<{
  Bindings: Env;
  Variables: DbVariables;
}>(async (c, next) => {
  const db = drizzle(c.env.DB);
  c.set('db', db);
  await next();
});
