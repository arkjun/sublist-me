'use client';

import type { BillingCycle, Currency, Subscription, SubscriptionInput } from '@sublistme/db/types';
import { SERVICE_CATALOGUE, type ServiceCatalogueItem } from '@sublistme/db/data/service-catalogue';
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

export function SubscriptionForm({
  open,
  onOpenChange,
  subscription,
  onSubmit,
}: SubscriptionFormProps) {
  const [formData, setFormData] = useState<SubscriptionInput>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [providerQuery, setProviderQuery] = useState('');

  const isEdit = !!subscription;

  // 카탈로그에서 서비스 옵션 생성
  const providerOptions = useMemo(() => {
    return SERVICE_CATALOGUE.map((service) => ({
      service,
      label: service.names.ko || service.names.en || service.slug,
    }));
  }, []);

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
                <option key={option.service.slug} value={option.label} />
              ))}
            </datalist>
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
