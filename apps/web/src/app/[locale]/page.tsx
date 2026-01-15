'use client';

import { useLocale } from 'next-intl';
import { useAuth } from '@/components/auth/auth-provider';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SubscriptionList } from '@/components/subscription/subscription-list';
import { ServiceCatalogue } from './(landing)/_components/service-catalogue';

export default function Home() {
  const { user, loading } = useAuth();
  const locale = useLocale();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto flex flex-1 max-w-5xl items-center justify-center px-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto max-w-5xl flex-1 px-4 py-8">
          <ServiceCatalogue />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-5xl flex-1 px-4 py-8">
        <Header />
        <SubscriptionList />
      </main>
      <Footer />
    </div>
  );
}
