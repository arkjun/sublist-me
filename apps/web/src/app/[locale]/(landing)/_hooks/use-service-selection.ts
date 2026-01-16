'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'sublistme_pending_services';

export function useServiceSelection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 자동 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedServices(parsed);
        }
      }
    } catch {
      // ignore parse error
    }
    setIsInitialized(true);
  }, []);

  // 선택이 변경될 때마다 자동으로 localStorage에 저장
  useEffect(() => {
    if (!isInitialized) return;
    if (selectedServices.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedServices));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedServices, isInitialized]);

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

  // 특정 서비스 목록만 localStorage에 저장 (기존 구독 제외용)
  const saveSpecificToStorage = useCallback((slugs: string[]) => {
    if (slugs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    }
  }, []);

  return {
    selectedServices,
    setSelectedServices,
    toggleService,
    selectAll,
    deselectAll,
    clearAll,
    isSelected,
    saveToStorage,
    saveSpecificToStorage,
    loadFromStorage,
    clearStorage,
    count: selectedServices.length,
    isInitialized,
  };
}
