'use client';

import { SERVICE_CATALOGUE } from '@sublistme/db/data/service-catalogue';
import type {
  BillingCycle,
  Currency,
  Subscription,
  SubscriptionInput,
} from '@sublistme/db/types';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface SubscriptionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription?: Subscription | null;
  onSubmit: (data: SubscriptionInput) => Promise<void>;
}

const defaultFormData: SubscriptionInput = {
  name: '',
  price: 0,
  originalPrice: undefined,
  currency: 'KRW',
  billingCycle: 'monthly',
  category: '',
  country: 'KR',
  url: '',
  logoUrl: '',
  memo: '',
  nextBillingDate: undefined,
};

export function SubscriptionForm({
  open,
  onOpenChange,
  subscription,
  onSubmit,
}: SubscriptionFormProps) {
  const t = useTranslations('SubscriptionForm');
  const locale = useLocale() as 'ko' | 'en' | 'ja';
  const [formData, setFormData] = useState<SubscriptionInput>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [providerQuery, setProviderQuery] = useState('');

  const isEdit = !!subscription;

  const billingCycles: { value: BillingCycle; label: string }[] = useMemo(
    () => [
      { value: 'monthly', label: t('billingCycle.monthly') },
      { value: 'yearly', label: t('billingCycle.yearly') },
      { value: 'weekly', label: t('billingCycle.weekly') },
      { value: 'quarterly', label: t('billingCycle.quarterly') },
    ],
    [t],
  );

  const currencies: { value: Currency; label: string }[] = useMemo(
    () => [
      { value: 'KRW', label: t('currency.KRW') },
      { value: 'USD', label: t('currency.USD') },
      { value: 'JPY', label: t('currency.JPY') },
      { value: 'EUR', label: t('currency.EUR') },
    ],
    [t],
  );

  const providerOptions = useMemo(() => {
    return SERVICE_CATALOGUE.map((service) => {
      const localizedName =
        service.names[locale] ||
        service.names.ko ||
        service.names.en ||
        service.slug;
      return {
        service,
        label: localizedName,
      };
    });
  }, [locale]);

  useEffect(() => {
    if (subscription) {
      setFormData({
        name: subscription.name,
        price: subscription.price,
        originalPrice: subscription.originalPrice ?? undefined,
        currency: subscription.currency,
        billingCycle: subscription.billingCycle,
        category: subscription.category ?? '',
        country: subscription.country ?? 'KR',
        url: subscription.url ?? '',
        logoUrl: subscription.logoUrl ?? '',
        memo: subscription.memo ?? '',
        nextBillingDate: subscription.nextBillingDate ?? '',
      });
      setProviderQuery(subscription.name);
    } else {
      setFormData(defaultFormData);
      setProviderQuery('');
    }
  }, [subscription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderQueryChange = (value: string) => {
    setProviderQuery(value);
    const matched = providerOptions.find(
      (option) => option.label === value || option.service.slug === value,
    );
    if (matched) {
      setFormData((prev) => ({
        ...prev,
        name: matched.label,
        url: matched.service.url ?? prev.url,
        logoUrl: matched.service.logoUrl ?? prev.logoUrl,
        category: matched.service.category || prev.category,
      }));
    }
  };

  const selectedProvider = providerOptions.find(
    (option) =>
      option.label === formData.name || option.service.slug === formData.name,
  );
  const resolvedLogoUrl: string =
    formData.logoUrl ?? selectedProvider?.service.logoUrl ?? '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('titleEdit') : t('titleCreate')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">{t('providerLabel')}</Label>
            <div className="flex items-center gap-3">
              {resolvedLogoUrl && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white">
                  <img
                    src={resolvedLogoUrl}
                    alt=""
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <Input
                id="provider"
                list="service-providers"
                value={providerQuery}
                onChange={(e) => handleProviderQueryChange(e.target.value)}
                placeholder={t('providerPlaceholder')}
                className="flex-1"
              />
            </div>
            <datalist id="service-providers">
              {providerOptions.map((option) => (
                <option key={option.service.slug} value={option.label} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t('nameLabel')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={t('namePlaceholder')}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t('priceLabel')}</Label>
              <Input
                id="price"
                type="number"
                value={formData.price ?? ''}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder={t('pricePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">{t('currencyLabel')}</Label>
              <Select
                id="currency"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">{t('originalPriceLabel')}</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                placeholder={t('originalPricePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCycle">{t('billingCycleLabel')}</Label>
              <Select
                id="billingCycle"
                value={formData.billingCycle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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

          <div className="space-y-2">
            <Label htmlFor="nextBillingDate">{t('nextBillingDateLabel')}</Label>
            <Input
              id="nextBillingDate"
              type="date"
              value={formData.nextBillingDate || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nextBillingDate: e.target.value || undefined,
                })
              }
              placeholder={t('datePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">{t('memoLabel')}</Label>
            <Input
              id="memo"
              value={formData.memo || ''}
              onChange={(e) =>
                setFormData({ ...formData, memo: e.target.value })
              }
              placeholder={t('memoPlaceholder')}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? t('submitting')
                : isEdit
                  ? t('submitEdit')
                  : t('submitCreate')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
