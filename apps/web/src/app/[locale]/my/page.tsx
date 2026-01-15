'use client';

import type { Currency, Locale } from '@sublistme/db/types';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { fetchUserPreferences, updateUserPreferences } from '@/lib/api';

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
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>('ko');
  const [currency, setCurrency] = useState<Currency>('KRW');

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
        const prefs = await fetchUserPreferences();
        setLocale(prefs.locale);
        setCurrency(prefs.currency);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : t('loadError');
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
      const prefs = await updateUserPreferences({ locale, currency });
      setLocale(prefs.locale);
      setCurrency(prefs.currency);
      setSuccess(t('saved'));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t('saveError');
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <p className="text-muted-foreground">{tCommon('loading')}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              onChange={(event) => setCurrency(event.target.value as Currency)}
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
          <Button onClick={handleSave} disabled={saving}>
            {saving ? t('saving') : tCommon('save')}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
