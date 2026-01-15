'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SubscriptionList } from '@/components/subscription/subscription-list';

export default function SubscriptionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/subscriptions');
    }
  }, [user, loading, router]);

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
    return null;
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
