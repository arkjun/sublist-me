'use client';

import { LogIn, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/locale-switcher';

export function Header() {
  const { user, loading, logout } = useAuth();
  const t = useTranslations('Header');
  const tCommon = useTranslations('Common');
  const tLanding = useTranslations('Landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="hover:opacity-80">
            <h1 className="text-2xl sm:text-3xl font-bold">SubList Me</h1>
          </Link>
          <p className="text-sm sm:text-base text-muted-foreground">{t('tagline')}</p>
        </div>

        {/* Desktop controls - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  {user.picture && (
                    <img
                      src={user.picture}
                      alt={user.name || tCommon('profile')}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {user.username}
                  </span>
                  <Link href="/my">
                    <Button variant="outline" size="sm">
                      {tCommon('mypage')}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {tCommon('logout')}
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button>
                    <LogIn className="mr-2 h-4 w-4" />
                    {tCommon('login')}
                  </Button>
                </Link>
              )}
            </>
          )}
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile controls row */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={tLanding('menu')}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu - collapsible */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 p-4 rounded-lg border bg-card space-y-3 animate-in slide-in-from-top-2">
          {!loading && (
            <>
              {user ? (
                <>
                  <div className="flex items-center gap-3 pb-3 border-b">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt={user.name || tCommon('profile')}
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.username}</p>
                    </div>
                  </div>
                  <Link href="/my" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      {tCommon('mypage')}
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {tCommon('logout')}
                  </Button>
                </>
              ) : (
                <Link href="/login" className="block">
                  <Button className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    {tCommon('login')}
                  </Button>
                </Link>
              )}
            </>
          )}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{tLanding('language')}</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
