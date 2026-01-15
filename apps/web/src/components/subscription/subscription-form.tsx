'use client';

import type {
  BillingCycle,
  Currency,
  ServiceProvider,
  Subscription,
  SubscriptionInput,
} from '@sublistme/db/types';
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

const billingCycles: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: '월간' },
  { value: 'yearly', label: '연간' },
  { value: 'weekly', label: '주간' },
  { value: 'quarterly', label: '분기' },
];

const currencies: { value: Currency; label: string }[] = [
  { value: 'KRW', label: '원 (KRW)' },
  { value: 'USD', label: '달러 (USD)' },
  { value: 'JPY', label: '엔 (JPY)' },
  { value: 'EUR', label: '유로 (EUR)' },
];

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export function SubscriptionForm({
  open,
  onOpenChange,
  subscription,
  onSubmit,
}: SubscriptionFormProps) {
  const [formData, setFormData] = useState<SubscriptionInput>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [providersError, setProvidersError] = useState(false);
  const [providerQuery, setProviderQuery] = useState('');

  const isEdit = !!subscription;

  const providerOptions = useMemo(() => {
    return providers.map((provider) => {
      const names = provider.names;
      let parsedNames: Record<string, string> = {};
      if (typeof names === 'string') {
        try {
          parsedNames = JSON.parse(names) as Record<string, string>;
        } catch {
          parsedNames = {};
        }
      } else if (typeof names === 'object' && names) {
        parsedNames = names as Record<string, string>;
      }

      const label =
        parsedNames.ko || parsedNames.en || parsedNames.ja || provider.slug;

      let category = '';
      const categories = provider.categories;
      if (Array.isArray(categories)) {
        category = categories[0] || '';
      } else if (typeof categories === 'string') {
        try {
          const parsed = JSON.parse(categories) as string[];
          category = parsed[0] || '';
        } catch {
          category = '';
        }
      }

      return {
        provider,
        label,
        category,
      };
    });
  }, [providers]);

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
  }, [subscription, open]);

  useEffect(() => {
    if (!open) return;
    let ignore = false;

    const fetchProviders = async () => {
      setProvidersLoading(true);
      setProvidersError(false);
      try {
        const res = await fetch(`${API_URL}/service-providers`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data: ServiceProvider[] = await res.json();
        if (!ignore) {
          setProviders(data);
        }
      } catch {
        if (!ignore) {
          setProviders([]);
          setProvidersError(true);
        }
      } finally {
        if (!ignore) {
          setProvidersLoading(false);
        }
      }
    };

    fetchProviders();

    return () => {
      ignore = true;
    };
  }, [open]);

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
      (option) => option.label === value || option.provider.slug === value,
    );
    if (matched) {
      setFormData((prev) => ({
        ...prev,
        name: matched.label,
        url: matched.provider.url ?? prev.url,
        logoUrl: matched.provider.logoUrl ?? prev.logoUrl,
        category: matched.category || prev.category,
      }));
    }
  };

  const selectedProvider = providerOptions.find(
    (option) =>
      option.label === formData.name || option.provider.slug === formData.name,
  );
  const resolvedLogoUrl: string =
    formData.logoUrl ?? selectedProvider?.provider.logoUrl ?? '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? '구독 수정' : '새 구독 추가'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">서비스 선택</Label>
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
                placeholder="서비스를 검색해 선택하세요"
                className="flex-1"
              />
            </div>
            <datalist id="service-providers">
              {providerOptions.map((option) => (
                <option key={option.provider.id} value={option.label} />
              ))}
            </datalist>
            {providersLoading && (
              <p className="text-xs text-muted-foreground">
                서비스 목록 불러오는 중...
              </p>
            )}
            {providersError && (
              <p className="text-xs text-destructive">
                서비스 목록을 불러오지 못했습니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">구독명 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="예: 유튜브 프리미엄"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">가격 *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ''}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="14900"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">통화</Label>
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
              <Label htmlFor="originalPrice">정가 (선택)</Label>
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
                placeholder="할인 비교용"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCycle">결제 주기</Label>
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
            <Label htmlFor="nextBillingDate">다음 결제일</Label>
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
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="예: 엔터테인먼트, 생산성"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">서비스 URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url || ''}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">메모</Label>
            <Input
              id="memo"
              value={formData.memo || ''}
              onChange={(e) =>
                setFormData({ ...formData, memo: e.target.value })
              }
              placeholder="추가 메모"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '저장 중...' : isEdit ? '수정' : '추가'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
