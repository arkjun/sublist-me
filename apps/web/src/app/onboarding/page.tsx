'use client';

import type { BillingCycle, Currency, SubscriptionInput } from '@sublistme/db/types';
import { getServiceBySlug, type ServiceCatalogueItem } from '@sublistme/db/data/service-catalogue';
import { ArrowLeft, Check, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

const STORAGE_KEY = 'sublistme_pending_services';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

interface ServiceFormData {
  slug: string;
  service: ServiceCatalogueItem;
  price: number;
  currency: Currency;
  billingCycle: BillingCycle;
}

const billingCycles: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: '월간' },
  { value: 'yearly', label: '연간' },
  { value: 'weekly', label: '주간' },
  { value: 'quarterly', label: '분기' },
];

const currencies: { value: Currency; label: string }[] = [
  { value: 'KRW', label: 'KRW' },
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'EUR', label: 'EUR' },
];

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // localStorage에서 선택된 서비스 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const slugs: string[] = JSON.parse(saved);
        const formData = slugs
          .map((slug) => {
            const service = getServiceBySlug(slug);
            if (!service) return null;
            return {
              slug,
              service,
              price: 0,
              currency: 'KRW' as Currency,
              billingCycle: 'monthly' as BillingCycle,
            };
          })
          .filter((s): s is ServiceFormData => s !== null);
        setServices(formData);
      }
    } catch {
      setServices([]);
    }
  }, []);

  // 로그인 안 되어있으면 로그인 페이지로
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/onboarding');
    }
  }, [user, authLoading, router]);

  const updateService = useCallback(
    (slug: string, updates: Partial<Omit<ServiceFormData, 'slug' | 'service'>>) => {
      setServices((prev) =>
        prev.map((s) => (s.slug === slug ? { ...s, ...updates } : s)),
      );
    },
    [],
  );

  const removeService = useCallback((slug: string) => {
    setServices((prev) => prev.filter((s) => s.slug !== slug));
  }, []);

  const handleSubmit = async () => {
    // 가격이 0인 서비스 필터링 (또는 모두 허용)
    const validServices = services.filter((s) => s.price > 0);

    if (validServices.length === 0) {
      setError('최소 1개 이상의 서비스에 가격을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const subscriptions: SubscriptionInput[] = validServices.map((s) => ({
        name: s.service.names.ko || s.service.names.en || s.slug,
        price: s.price,
        currency: s.currency,
        billingCycle: s.billingCycle,
        category: s.service.category,
        url: s.service.url,
        logoUrl: s.service.logoUrl,
      }));

      const res = await fetch(`${API_URL}/subscriptions/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ subscriptions }),
      });

      if (!res.ok) {
        throw new Error('구독 추가에 실패했습니다.');
      }

      // 성공하면 localStorage 클리어하고 메인으로 이동
      localStorage.removeItem(STORAGE_KEY);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <main className="container mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (services.length === 0) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">선택된 서비스가 없습니다</h1>
          <p className="mb-8 text-muted-foreground">
            먼저 구독 서비스를 선택해주세요.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              서비스 선택하러 가기
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          돌아가기
        </Link>
        <h1 className="text-2xl font-bold">구독 정보 입력</h1>
        <p className="text-muted-foreground">
          선택한 {services.length}개 서비스의 구독 정보를 입력해주세요.
        </p>
      </div>

      {/* 서비스 목록 */}
      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s.slug}
            className="rounded-lg border bg-card p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {s.service.logoUrl && (
                  <div className="h-10 w-10 overflow-hidden rounded-lg bg-muted p-1">
                    <img
                      src={s.service.logoUrl}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">
                    {s.service.names.ko || s.service.names.en}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {s.service.category}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeService(s.slug)}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`price-${s.slug}`} className="text-xs">
                  가격 *
                </Label>
                <Input
                  id={`price-${s.slug}`}
                  type="number"
                  value={s.price || ''}
                  onChange={(e) =>
                    updateService(s.slug, { price: Number(e.target.value) })
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`currency-${s.slug}`} className="text-xs">
                  통화
                </Label>
                <Select
                  id={`currency-${s.slug}`}
                  value={s.currency}
                  onChange={(e) =>
                    updateService(s.slug, {
                      currency: e.target.value as Currency,
                    })
                  }
                >
                  {currencies.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor={`cycle-${s.slug}`} className="text-xs">
                  주기
                </Label>
                <Select
                  id={`cycle-${s.slug}`}
                  value={s.billingCycle}
                  onChange={(e) =>
                    updateService(s.slug, {
                      billingCycle: e.target.value as BillingCycle,
                    })
                  }
                >
                  {billingCycles.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* 제출 버튼 */}
      <div className="mt-8 flex justify-end gap-3">
        <Link href="/">
          <Button variant="outline">취소</Button>
        </Link>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              추가 중...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {services.length}개 구독 추가
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
