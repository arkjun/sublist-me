'use client';

import type { Subscription } from '@sublistme/db/types';
import {
  CATEGORY_INFO,
  getCategoriesWithServices,
  getServicesByCategory,
  getSlugByLogoUrl,
  SERVICE_CATALOGUE,
} from '@sublistme/db/data/service-catalogue';
import { Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useServiceSelection } from '../_hooks/use-service-selection';
import { CategorySection } from './category-section';
import { LandingHeader } from './landing-header';
import { SelectionBar } from './selection-bar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export function ServiceCatalogue() {
  const { user } = useAuth();
  const locale = useLocale() as 'ko' | 'en' | 'ja';
  const t = useTranslations('Landing');
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

  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredCategoriesWithServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const categories = getCategoriesWithServices();

    if (!query) {
      return categories.map((category) => ({
        category,
        services: getServicesByCategory(category.id),
      }));
    }

    // Filter services that match the query
    const matchingServices = SERVICE_CATALOGUE.filter((service) => {
      const nameMatch = Object.values(service.names).some((name) =>
        name.toLowerCase().includes(query)
      );
      const categoryInfo = CATEGORY_INFO.find((c) => c.id === service.category);
      const categoryMatch = categoryInfo
        ? Object.values(categoryInfo.names).some((name) =>
            name.toLowerCase().includes(query)
          )
        : false;
      const slugMatch = service.slug.toLowerCase().includes(query);
      return nameMatch || categoryMatch || slugMatch;
    });

    // Group by category
    const servicesByCategory = new Map<string, typeof matchingServices>();
    matchingServices.forEach((service) => {
      const existing = servicesByCategory.get(service.category) || [];
      servicesByCategory.set(service.category, [...existing, service]);
    });

    return categories
      .filter((category) => servicesByCategory.has(category.id))
      .map((category) => ({
        category,
        services: servicesByCategory.get(category.id) || [],
      }));
  }, [searchQuery]);

  const totalFilteredServices = filteredCategoriesWithServices.reduce(
    (acc, { services }) => acc + services.length,
    0
  );

  return (
    <div className="relative min-h-screen pb-24">
      <LandingHeader selectedCount={count} />

      {/* Search Input */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search results info */}
      {searchQuery && (
        <p className="mb-4 text-sm text-muted-foreground">
          {totalFilteredServices > 0
            ? `${totalFilteredServices} services found`
            : t('noResults')}
        </p>
      )}

      {filteredCategoriesWithServices.map(({ category, services }) => (
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
