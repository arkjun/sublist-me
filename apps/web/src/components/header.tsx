'use client'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut } from 'lucide-react'

export function Header() {
  const { user, loading, login, logout } = useAuth()

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Magami</h1>
        <p className="text-muted-foreground">내 구독을 한눈에 관리하세요</p>
      </div>
      <div className="flex items-center gap-3">
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-3">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name || '프로필'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button onClick={login}>
                <LogIn className="mr-2 h-4 w-4" />
                Google 로그인
              </Button>
            )}
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
