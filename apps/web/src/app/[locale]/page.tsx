'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { Footer } from '@/components/footer';
import { useRouter } from '@/i18n/navigation';
import { ServiceCatalogue } from './(landing)/_components/service-catalogue';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checkingSubscriptions, setCheckingSubscriptions] = useState(false);

  useEffect(() => {
    if (loading || !user) return;

    let isActive = true;

    const checkSubscriptions = async () => {
      setCheckingSubscriptions(true);
      try {
        const res = await fetch(`${API_URL}/subscriptions`, {
          credentials: 'include',
        });
        if (!isActive) return;

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            router.replace('/subscriptions');
          }
        }
      } catch (error) {
        console.error('Failed to check subscriptions:', error);
      } finally {
        if (isActive) {
          setCheckingSubscriptions(false);
        }
      }
    };

    checkSubscriptions();

    return () => {
      isActive = false;
    };
  }, [loading, user, router]);

  if (loading || checkingSubscriptions) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="container mx-auto flex flex-1 max-w-5xl items-center justify-center px-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto max-w-5xl flex-1 px-4 py-8">
        <ServiceCatalogue />
      </main>
      <Footer />
    </div>
  );
}
