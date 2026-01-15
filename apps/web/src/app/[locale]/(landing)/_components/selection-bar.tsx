'use client';

import { getServiceBySlug } from '@sublistme/db/data/service-catalogue';
import { ArrowRight, Check, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';

interface SelectionBarProps {
  selectedServices: string[];
  existingSubscriptionSlugs: string[];
  onClear: () => void;
  onSaveToStorage: () => void;
  onSaveSpecificToStorage: (slugs: string[]) => void;
}

export function SelectionBar({
  selectedServices,
  existingSubscriptionSlugs,
  onClear,
  onSaveToStorage,
  onSaveSpecificToStorage,
}: SelectionBarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const locale = useLocale() as 'ko' | 'en' | 'ja';
  const t = useTranslations('Landing');

  // 새로 추가할 구독 (기존 구독 제외)
  const newSubscriptions = selectedServices.filter(
    (slug) => !existingSubscriptionSlugs.includes(slug)
  );

  const handleAction = () => {
    if (user) {
      // 로그인 상태: 새 구독만 저장하고 onboarding으로 이동
      if (newSubscriptions.length === 0) {
        // 새 구독이 없으면 아무것도 하지 않음
        return;
      }
      onSaveSpecificToStorage(newSubscriptions);
      router.push('/onboarding');
    } else {
      // 비로그인 상태: 전체 저장하고 로그인으로 이동
      onSaveToStorage();
      router.push('/login?redirect=/onboarding');
    }
  };

  if (selectedServices.length === 0) {
    return null;
  }

  const selectedServiceInfo = selectedServices
    .slice(0, 5)
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  const remainingCount = selectedServices.length - 5;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <div className="flex -space-x-2">
              {selectedServiceInfo.map((service) =>
                service?.logoUrl ? (
                  <div
                    key={service.slug}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-background bg-muted"
                    title={service.names[locale] || service.names.en || service.slug}
                  >
                    <img
                      src={service.logoUrl}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                ) : (
                  <div
                    key={service?.slug}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-bold"
                  >
                    {(service?.names[locale] || service?.names.en || service?.slug || '?').charAt(0)}
                  </div>
                ),
              )}
            </div>
            <span className="text-sm font-medium">
              {t('selectCount', { count: selectedServices.length })}
              {remainingCount > 0 && (
                <span className="text-muted-foreground"> (+{remainingCount})</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClear}>
              <X className="mr-1 h-4 w-4" />
              {t('clear')}
            </Button>
            <Button
              onClick={handleAction}
              disabled={user ? newSubscriptions.length === 0 : false}
            >
              {user ? (
                <>
                  {t('save')}
                  {newSubscriptions.length > 0 && (
                    <span className="ml-1">({newSubscriptions.length})</span>
                  )}
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  {t('continue')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
