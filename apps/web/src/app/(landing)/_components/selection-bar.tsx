'use client';

import { getServiceBySlug } from '@sublistme/db/data/service-catalogue';
import { ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SelectionBarProps {
  selectedServices: string[];
  onClear: () => void;
  onSaveToStorage: () => void;
  locale?: 'ko' | 'en' | 'ja';
}

export function SelectionBar({
  selectedServices,
  onClear,
  onSaveToStorage,
  locale = 'ko',
}: SelectionBarProps) {
  const router = useRouter();

  const handleContinue = () => {
    // localStorage에 선택 저장 후 로그인으로 이동
    onSaveToStorage();
    router.push('/login?redirect=/onboarding');
  };

  if (selectedServices.length === 0) {
    return null;
  }

  // 선택된 서비스 정보 가져오기 (최대 5개만 표시)
  const selectedServiceInfo = selectedServices
    .slice(0, 5)
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  const remainingCount = selectedServices.length - 5;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* 선택된 서비스 미리보기 */}
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
              {selectedServices.length}개 선택됨
              {remainingCount > 0 && (
                <span className="text-muted-foreground"> (+{remainingCount})</span>
              )}
            </span>
          </div>

          {/* 버튼 */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClear}>
              <X className="mr-1 h-4 w-4" />
              초기화
            </Button>
            <Button onClick={handleContinue}>
              계속하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
