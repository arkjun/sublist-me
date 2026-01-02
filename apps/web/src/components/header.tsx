'use client'

import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Magami</h1>
        <p className="text-muted-foreground">내 구독을 한눈에 관리하세요</p>
      </div>
      <ThemeToggle />
    </header>
  )
}
