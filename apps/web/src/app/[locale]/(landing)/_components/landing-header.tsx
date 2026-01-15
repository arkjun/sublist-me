'use client';

import { List, LogIn, LogOut } from 'lucide-react';
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

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SubList Me</h1>
          <p className="text-muted-foreground">{t('tagline')}</p>
        </div>
        <div className="flex items-center gap-3">
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
              <span className="hidden text-sm text-muted-foreground sm:inline">
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
            <Link href="/login">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                {tCommon('login')}
              </Button>
            </Link>
          )}
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>

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
