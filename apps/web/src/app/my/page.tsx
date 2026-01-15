'use client';

import type { Currency, Locale } from '@sublistme/db/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
            : '환경 설정을 불러오지 못했습니다.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [authLoading, user, router]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const prefs = await updateUserPreferences({ locale, currency });
      setLocale(prefs.locale);
      setCurrency(prefs.currency);
      setSuccess('환경 설정이 저장되었습니다.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '저장에 실패했습니다.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <p className="text-muted-foreground">로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>마이페이지</CardTitle>
          <CardDescription>언어와 통화 설정을 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="locale">언어</Label>
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
            <Label htmlFor="currency">통화</Label>
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
            {saving ? '저장 중...' : '저장'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
