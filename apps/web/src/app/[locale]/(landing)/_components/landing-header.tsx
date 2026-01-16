'use client';

import { List, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Button } from '@/components/ui/button';

interface LandingHeaderProps {
  selectedCount: number;
}

export function LandingHeader({ selectedCount }: LandingHeaderProps) {
  const { user, logout } = useAuth();
  const t = useTranslations('Landing');
  const tCommon = useTranslations('Common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">SubList Me</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t('tagline')}</p>
        </div>

        {/* Desktop controls - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              {t('selectCount', { count: selectedCount })}
            </span>
          )}
          {user ? (
            <>
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name || tCommon('profile')}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">
                {user.name || user.email}
              </span>
              <Link href="/subscriptions">
                <Button variant="outline" size="sm">
                  <List className="mr-2 h-4 w-4" />
                  {t('mySubscriptions')}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                {tCommon('logout')}
              </Button>
            </>
          ) : (
            <Link href={selectedCount > 0 ? '/login?redirect=/onboarding' : '/login'}>
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                {tCommon('login')}
              </Button>
            </Link>
          )}
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile controls row */}
        <div className="flex sm:hidden items-center gap-2">
          {selectedCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {selectedCount}
            </span>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('menu')}
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
                  <p className="font-medium truncate">{user.name || user.email}</p>
                </div>
              </div>
              <Link href="/subscriptions" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <List className="mr-2 h-4 w-4" />
                  {t('mySubscriptions')}
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                {tCommon('logout')}
              </Button>
            </>
          ) : (
            <Link href={selectedCount > 0 ? '/login?redirect=/onboarding' : '/login'} className="block">
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                {tCommon('login')}
              </Button>
            </Link>
          )}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('language')}</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          {user ? (
            <>
              <span className="font-medium text-foreground">Select → Save → Manage</span>
              {' · '}
              {t('instructionLoggedIn')}
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">Select → Login → Track</span>
              {' · '}
              {t('instruction')}
            </>
          )}
        </p>
      </div>
    </header>
  );
}
