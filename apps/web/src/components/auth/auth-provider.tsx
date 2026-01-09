'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

type User = {
  id: string
  googleId: string
  email: string
  name: string | null
  picture: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: () => void
  loginWithEmail: (email: string, password: string) => Promise<void>
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
      })
      const data: { user: User | null } = await res.json()
      setUser(data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  /* Existing logic */
  const login = () => {
    window.location.href = `${API_URL}/auth/login/google`
  }

  const loginWithEmail = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Login failed')
    }
    await fetchUser()
  }

  const signupWithEmail = async (email: string, password: string, name: string) => {
    const res = await fetch(`${API_URL}/auth/signup/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
      credentials: 'include',
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Signup failed')
    }
    await fetchUser()
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithEmail, signupWithEmail, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
