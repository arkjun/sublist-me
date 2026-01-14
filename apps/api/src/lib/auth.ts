import { Lucia } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'
import { Google } from 'arctic'
import { Scrypt } from 'lucia'

export const scrypt = new Scrypt()

export function createLucia(db: D1Database) {
  const adapter = new D1Adapter(db, {
    user: 'users',
    session: 'sessions',
  })

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: true,
        sameSite: 'lax',
      },
    },
    getUserAttributes: (attributes) => {
      return {
        googleId: attributes.google_id,
        email: attributes.email,
        name: attributes.name,
        picture: attributes.picture,
        locale: attributes.locale,
        currency: attributes.currency,
      }
    },
  })
}

export function createGoogleAuth(clientId: string, clientSecret: string, redirectUri: string) {
  return new Google(clientId, clientSecret, redirectUri)
}

// Type declarations
declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof createLucia>
    DatabaseUserAttributes: {
      google_id: string | null
      email: string
      name: string | null
      picture: string | null
      locale: string
      currency: string
    }
  }
}
