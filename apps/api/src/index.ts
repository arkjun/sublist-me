import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { subscriptions } from './routes/subscriptions'
import { serviceProviders } from './routes/service-providers'
import { auth } from './routes/auth'
import { sessionMiddleware } from './middleware/auth'
import type { User, Session } from 'lucia'

export type Env = {
  DB: D1Database
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_REDIRECT_URI: string
  FRONTEND_URL: string
}

type Variables = {
  user: User | null
  session: Session | null
}

const app = new Hono<{ Bindings: Env; Variables: Variables }>()

// Middleware
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}))
app.use('/*', sessionMiddleware)

// Routes
app.route('/auth', auth)
app.route('/subscriptions', subscriptions)
app.route('/service-providers', serviceProviders)

// Health check
app.get('/', (c) => c.json({ message: 'Magami API', status: 'ok' }))

export default app

// Export type for Hono RPC client
export type AppType = typeof app
