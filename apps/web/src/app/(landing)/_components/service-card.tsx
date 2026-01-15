'use client';

import type { ServiceCatalogueItem } from '@sublistme/db/data/service-catalogue';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: ServiceCatalogueItem;
  isSelected: boolean;
  onToggle: () => void;
  locale?: 'ko' | 'en' | 'ja';
}

export function ServiceCard({
  service,
  isSelected,
  onToggle,
  locale = 'ko',
}: ServiceCardProps) {
  const name = service.names[locale] || service.names.en || service.slug;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg border bg-card p-3 text-left transition-all hover:bg-accent/50',
        isSelected && 'border-primary bg-primary/5 ring-2 ring-primary',
      )}
    >
      {/* 로고 */}
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {service.logoUrl ? (
          <img
            src={service.logoUrl}
            alt={name}
            className="h-full w-full object-contain p-1"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* 이름 */}
      <span className="flex-1 truncate text-sm font-medium">{name}</span>

      {/* 체크 표시 */}
      <div
        className={cn(
          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all',
          isSelected
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/30 group-hover:border-muted-foreground/50',
        )}
      >
        {isSelected && <Check className="h-3 w-3" />}
      </div>
    </button>
  );
}
