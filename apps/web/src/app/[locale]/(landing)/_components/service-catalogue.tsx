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

export function ServiceCatalogue() {
  const {
    selectedServices,
    toggleService,
    clearAll,
    saveToStorage,
    count,
  } = useServiceSelection();

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

      {categoriesWithServices.map(({ category, services }) => (
        <CategorySection
          key={category.id}
          category={category}
          services={services}
          selectedServices={selectedServices}
          onToggle={toggleService}
        />
      ))}

      <SelectionBar
        selectedServices={selectedServices}
        onClear={clearAll}
        onSaveToStorage={saveToStorage}
      />
    </div>
  );
}
