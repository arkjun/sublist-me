import { hc } from 'hono/client'
import type { AppType } from '@magami/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:51332'

export const api = hc<AppType>(API_URL)
