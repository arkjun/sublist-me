import { createMiddleware } from 'hono/factory'
import { getCookie, setCookie } from 'hono/cookie'
import { createLucia } from '../lib/auth'
import type { User, Session } from 'lucia'

type Env = {
  DB: D1Database
}

type AuthVariables = {
  user: User | null
  session: Session | null
}

// 세션 검증 미들웨어 (인증 필수 아님)
export const sessionMiddleware = createMiddleware<{
  Bindings: Env
  Variables: AuthVariables
}>(async (c, next) => {
  const lucia = createLucia(c.env.DB)
  const sessionId = getCookie(c, lucia.sessionCookieName)

  if (!sessionId) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }

  const { session, user } = await lucia.validateSession(sessionId)

  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    })
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    setCookie(c, sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      sameSite: 'Lax',
    })
  }

  c.set('user', user)
  c.set('session', session)
  return next()
})

// 인증 필수 미들웨어
export const requireAuth = createMiddleware<{
  Bindings: Env
  Variables: AuthVariables
}>(async (c, next) => {
  const user = c.get('user')
  const session = c.get('session')

  if (!user || !session) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  return next()
})
