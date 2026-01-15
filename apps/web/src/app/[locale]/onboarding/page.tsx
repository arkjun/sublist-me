'use client';

import type { BillingCycle, Currency, SubscriptionInput } from '@sublistme/db/types';
import { getServiceBySlug, type ServiceCatalogueItem } from '@sublistme/db/data/service-catalogue';
import { ArrowLeft, Check, Loader2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
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

const currencies: { value: Currency; label: string }[] = [
  { value: 'KRW', label: 'KRW' },
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'EUR', label: 'EUR' },
];

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale() as 'ko' | 'en' | 'ja';
  const t = useTranslations('Onboarding');
  const tCommon = useTranslations('Common');
  const tSub = useTranslations('Subscription');
  const [services, setServices] = useState<ServiceFormData[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const billingCycles: { value: BillingCycle; label: string }[] = [
    { value: 'monthly', label: tSub('billingCycle.monthly') },
    { value: 'yearly', label: tSub('billingCycle.yearly') },
    { value: 'weekly', label: tSub('billingCycle.weekly') },
    { value: 'quarterly', label: tSub('billingCycle.quarterly') },
  ];

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
    const validServices = services.filter((s) => s.price > 0);

    if (validServices.length === 0) {
      setError(t('priceError'));
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const subscriptions: SubscriptionInput[] = validServices.map((s) => ({
        name: s.service.names[locale] || s.service.names.en || s.slug,
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
        throw new Error(t('submitError'));
      }

      localStorage.removeItem(STORAGE_KEY);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error'));
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
          <h1 className="mb-4 text-2xl font-bold">{t('noServices')}</h1>
          <p className="mb-8 text-muted-foreground">
            {t('noServicesDesc')}
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('goSelect')}
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {tCommon('goBack')}
        </Link>
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description', { count: services.length })}
        </p>
      </div>

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
                    {s.service.names[locale] || s.service.names.en}
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
                  {t('price')} *
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
                  {t('currency')}
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
                  {t('cycle')}
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

      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <Link href="/">
          <Button variant="outline">{tCommon('cancel')}</Button>
        </Link>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('adding')}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {t('addingCount', { count: services.length })}
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
