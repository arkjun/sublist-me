'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

interface LandingHeaderProps {
  selectedCount: number;
}

export function LandingHeader({ selectedCount }: LandingHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SubList Me</h1>
          <p className="text-muted-foreground">구독 서비스를 선택하고 관리하세요</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              {selectedCount}개 선택됨
            </span>
          )}
          <Link href="/login">
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* 설명 */}
      <div className="mt-6 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Select → Login → Track</span>
          {' · '}
          사용 중인 구독 서비스를 선택한 후 로그인하면, 선택한 서비스들을 한번에 추가할 수 있습니다.
        </p>
      </div>
    </header>
  );
}
