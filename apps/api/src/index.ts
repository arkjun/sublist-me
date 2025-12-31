import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { subscriptions } from './routes/subscriptions'

export type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

// Middleware
app.use('/*', cors())

// Routes
app.route('/subscriptions', subscriptions)

// Health check
app.get('/', (c) => c.json({ message: 'Magami API', status: 'ok' }))

export default app

// Export type for Hono RPC client
export type AppType = typeof app
