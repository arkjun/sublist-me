'use client';

import type { CategoryInfo, ServiceCatalogueItem } from '@sublistme/db/data/service-catalogue';
import {
  Briefcase,
  Cloud,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  MoreHorizontal,
  Music,
  Newspaper,
  ShoppingBag,
  Tv,
  UtensilsCrossed,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ServiceCard } from './service-card';

// 아이콘 매핑
const ICON_MAP: Record<string, LucideIcon> = {
  Tv,
  Music,
  Gamepad2,
  ShoppingBag,
  Briefcase,
  Cloud,
  Newspaper,
  Dumbbell,
  GraduationCap,
  Wallet,
  UtensilsCrossed,
  MoreHorizontal,
};

interface CategorySectionProps {
  category: CategoryInfo;
  services: ServiceCatalogueItem[];
  selectedServices: string[];
  onToggle: (slug: string) => void;
  locale?: 'ko' | 'en' | 'ja';
}

export function CategorySection({
  category,
  services,
  selectedServices,
  onToggle,
  locale = 'ko',
}: CategorySectionProps) {
  const Icon = ICON_MAP[category.icon] || MoreHorizontal;
  const categoryName = category.names[locale] || category.names.en || category.id;
  const selectedCount = services.filter((s) => selectedServices.includes(s.slug)).length;

  return (
    <section className="mb-8">
      {/* 카테고리 헤더 */}
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">{categoryName}</h2>
        <span className="text-sm text-muted-foreground">({services.length})</span>
        {selectedCount > 0 && (
          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {selectedCount} selected
          </span>
        )}
      </div>

      {/* 서비스 그리드 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            isSelected={selectedServices.includes(service.slug)}
            onToggle={() => onToggle(service.slug)}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
