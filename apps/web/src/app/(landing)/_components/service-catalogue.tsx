'use client';

import {
  getCategoriesWithServices,
  getServicesByCategory,
} from '@sublistme/db/data/service-catalogue';
import { useMemo } from 'react';
import { useServiceSelection } from '../_hooks/use-service-selection';
import { CategorySection } from './category-section';
import { LandingHeader } from './landing-header';
import { SelectionBar } from './selection-bar';

interface ServiceCatalogueProps {
  locale?: 'ko' | 'en' | 'ja';
}

export function ServiceCatalogue({ locale = 'ko' }: ServiceCatalogueProps) {
  const {
    selectedServices,
    toggleService,
    clearAll,
    saveToStorage,
    count,
  } = useServiceSelection();

  // 카테고리와 서비스 데이터 메모이제이션
  const categoriesWithServices = useMemo(() => {
    const categories = getCategoriesWithServices();
    return categories.map((category) => ({
      category,
      services: getServicesByCategory(category.id),
    }));
  }, []);

  return (
    <div className="relative min-h-screen pb-24">
      <LandingHeader selectedCount={count} />

      {/* 카테고리별 섹션 */}
      {categoriesWithServices.map(({ category, services }) => (
        <CategorySection
          key={category.id}
          category={category}
          services={services}
          selectedServices={selectedServices}
          onToggle={toggleService}
          locale={locale}
        />
      ))}

      {/* 하단 선택 바 */}
      <SelectionBar
        selectedServices={selectedServices}
        onClear={clearAll}
        onSaveToStorage={saveToStorage}
        locale={locale}
      />
    </div>
  );
}
