'use client';

import type { Currency, Locale } from '@sublistme/db/types';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useRouter } from '@/i18n/navigation';
import {
  checkUsernameAvailability,
  fetchUsername,
  fetchUserPreferences,
  updateUsername,
  updateUserPreferences,
} from '@/lib/api';

const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
];

const currencyOptions: { value: Currency; label: string }[] = [
  { value: 'KRW', label: 'KRW (₩)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
];

export default function MyPage() {
  const router = useRouter();
  const t = useTranslations('MyPage');
  const tCommon = useTranslations('Common');
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>('ko');
  const [currency, setCurrency] = useState<Currency>('KRW');

  // Username state
  const [username, setUsername] = useState('');
  const [originalUsername, setOriginalUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );
  const [checkingUsername, setCheckingUsername] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced username availability check
  const checkUsername = useCallback(
    async (value: string) => {
      if (!value || value === originalUsername) {
        setUsernameAvailable(null);
        setUsernameError(null);
        return;
      }

      setCheckingUsername(true);
      try {
        const result = await checkUsernameAvailability(value);
        if (result.available) {
          setUsernameAvailable(true);
          setUsernameError(null);
        } else {
          setUsernameAvailable(false);
          setUsernameError(result.error || t('usernameTaken'));
        }
      } catch {
        setUsernameError(t('saveError'));
        setUsernameAvailable(false);
      } finally {
        setCheckingUsername(false);
      }
    },
    [originalUsername, t],
  );

  const handleUsernameChange = (value: string) => {
    const normalized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setUsername(normalized);
    setUsernameError(null);
    setUsernameAvailable(null);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (normalized && normalized !== originalUsername) {
      debounceTimer.current = setTimeout(() => {
        checkUsername(normalized);
      }, 500);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [prefs, usernameData] = await Promise.all([
          fetchUserPreferences(),
          fetchUsername(),
        ]);
        setLocale(prefs.locale);
        setCurrency(prefs.currency);
        setUsername(usernameData.username);
        setOriginalUsername(usernameData.username);
      } catch (err) {
        const message = err instanceof Error ? err.message : t('loadError');
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [authLoading, user, router, t]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Update preferences
      const prefs = await updateUserPreferences({ locale, currency });
      setLocale(prefs.locale);
      setCurrency(prefs.currency);

      // Update username if changed
      if (username !== originalUsername) {
        const usernameResult = await updateUsername(username);
        setUsername(usernameResult.username);
        setOriginalUsername(usernameResult.username);
        setUsernameAvailable(null);
        await refreshUser();
      }

      setSuccess(t('saved'));
    } catch (err) {
      const message = err instanceof Error ? err.message : t('saveError');
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto max-w-5xl flex-1 px-4 py-8">
          <p className="text-muted-foreground">{tCommon('loading')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-5xl flex-1 px-4 py-8">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">{t('username')}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="my-username"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                {t('usernameHint')}
              </p>
              {checkingUsername && (
                <p className="text-xs text-muted-foreground">
                  {t('checkingUsername')}
                </p>
              )}
              {usernameError && (
                <p className="text-xs text-destructive">{usernameError}</p>
              )}
              {usernameAvailable && !usernameError && (
                <p className="text-xs text-green-600">
                  {t('usernameAvailable')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="locale">{t('language')}</Label>
              <Select
                id="locale"
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
              >
                {localeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">{t('currency')}</Label>
              <Select
                id="currency"
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value as Currency)
                }
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSave}
              disabled={saving || checkingUsername || !!usernameError}
            >
              {saving ? t('saving') : tCommon('save')}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
