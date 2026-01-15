'use client';

import { LogIn, LogOut, Plus } from 'lucide-react';
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
  const tSub = useTranslations('Subscription');

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="hover:opacity-80">
          <h1 className="text-3xl font-bold">SubList Me</h1>
        </Link>
        <p className="text-muted-foreground">{t('tagline')}</p>
      </div>
      <div className="flex items-center gap-3">
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
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  {user.name || user.email}
                </span>
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    {tSub('add')}
                  </Button>
                </Link>
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
    </header>
  );
}
