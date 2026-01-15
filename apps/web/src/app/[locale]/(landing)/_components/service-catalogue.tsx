'use client';

import type { Subscription } from '@sublistme/db/types';
import {
  getCategoriesWithServices,
  getServicesByCategory,
  getSlugByLogoUrl,
} from '@sublistme/db/data/service-catalogue';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { useServiceSelection } from '../_hooks/use-service-selection';
import { CategorySection } from './category-section';
import { LandingHeader } from './landing-header';
import { SelectionBar } from './selection-bar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export function ServiceCatalogue() {
  const { user } = useAuth();
  const {
    selectedServices,
    toggleService,
    clearAll,
    selectAll,
    saveToStorage,
    saveSpecificToStorage,
    count,
    isInitialized,
  } = useServiceSelection();

  const [existingSubscriptionSlugs, setExistingSubscriptionSlugs] = useState<string[]>([]);
  const [subscriptionsLoaded, setSubscriptionsLoaded] = useState(false);

  // 로그인 사용자의 기존 구독 목록 fetch
  const fetchExistingSubscriptions = useCallback(async () => {
    if (!user) {
      setExistingSubscriptionSlugs([]);
      setSubscriptionsLoaded(true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/subscriptions`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data: Subscription[] = await res.json();
        // logoUrl을 사용하여 slug 매핑
        const slugs = data
          .map((sub) => (sub.logoUrl ? getSlugByLogoUrl(sub.logoUrl) : undefined))
          .filter((slug): slug is string => slug !== undefined);
        setExistingSubscriptionSlugs(slugs);
        // 기존 구독 서비스를 선택 상태로 설정
        if (slugs.length > 0) {
          selectAll(slugs);
        }
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
    setSubscriptionsLoaded(true);
  }, [user, selectAll]);

  useEffect(() => {
    if (isInitialized) {
      fetchExistingSubscriptions();
    }
  }, [isInitialized, fetchExistingSubscriptions]);

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
        existingSubscriptionSlugs={existingSubscriptionSlugs}
        onClear={clearAll}
        onSaveToStorage={saveToStorage}
        onSaveSpecificToStorage={saveSpecificToStorage}
      />
    </div>
  );
}
