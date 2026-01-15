'use client';

import { useAuth } from '@/components/auth/auth-provider';
import { Header } from '@/components/header';
import { SubscriptionList } from '@/components/subscription/subscription-list';
import { ServiceCatalogue } from './(landing)/_components/service-catalogue';

export default function Home() {
  const { user, loading } = useAuth();

  // 로딩 중
  if (loading) {
    return (
      <main className="container mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    );
  }

  // 비로그인: 서비스 카탈로그 (랜딩)
  if (!user) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <ServiceCatalogue locale="ko" />
      </main>
    );
  }

  // 로그인: 구독 목록
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <Header />
      <SubscriptionList />
    </main>
  );
}
