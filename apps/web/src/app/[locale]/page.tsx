'use client';

import { useLocale } from 'next-intl';
import { useAuth } from '@/components/auth/auth-provider';
import { Header } from '@/components/header';
import { SubscriptionList } from '@/components/subscription/subscription-list';
import { ServiceCatalogue } from './(landing)/_components/service-catalogue';

export default function Home() {
  const { user, loading } = useAuth();
  const locale = useLocale();

  if (loading) {
    return (
      <main className="container mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <ServiceCatalogue />
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <Header />
      <SubscriptionList />
    </main>
  );
}
