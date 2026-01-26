import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Session, User } from 'lucia';
import { sessionMiddleware } from './middleware/auth';
import { type DbVariables, dbMiddleware } from './middleware/db';
import { auth } from './routes/auth';
import { subscriptions } from './routes/subscriptions';
import { users } from './routes/users';

export type Env = {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
  FRONTEND_URL: string;
};

type Variables = {
  user: User | null;
  session: Session | null;
} & DbVariables;

const app = new Hono<{ Bindings: Env; Variables: Variables }>()
  .use(
    '/*',
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://app.sublistme.com',
      ],
      credentials: true,
    }),
  )
  .use('/*', sessionMiddleware)
  .use('/*', dbMiddleware)
  .route('/auth', auth)
  .route('/users', users)
  .route('/subscriptions', subscriptions)
  .get('/', (c) => c.json({ message: 'SubList Me API', status: 'ok' }));

export default app;

// Export type for Hono RPC client
export type AppType = typeof app;
