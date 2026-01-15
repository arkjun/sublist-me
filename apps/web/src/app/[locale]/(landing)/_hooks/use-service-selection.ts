'use client';

import { useCallback, useState } from 'react';

const STORAGE_KEY = 'sublistme_pending_services';

export function useServiceSelection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = useCallback((slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const selectAll = useCallback((slugs: string[]) => {
    setSelectedServices((prev) => {
      const newSet = new Set([...prev, ...slugs]);
      return Array.from(newSet);
    });
  }, []);

  const deselectAll = useCallback((slugs: string[]) => {
    setSelectedServices((prev) => prev.filter((s) => !slugs.includes(s)));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => selectedServices.includes(slug),
    [selectedServices],
  );

  // localStorage에 저장 (로그인 후 복원용)
  const saveToStorage = useCallback(() => {
    if (selectedServices.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
    }
  }, [selectedServices]);

  // localStorage에서 복원
  const loadFromStorage = useCallback((): string[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  // localStorage 클리어
  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    selectedServices,
    toggleService,
    selectAll,
    deselectAll,
    clearAll,
    isSelected,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    count: selectedServices.length,
  };
}
