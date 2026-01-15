'use client';

import type { Subscription, SubscriptionInput } from '@sublistme/db/types';
import { LogIn, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { getColumns } from './columns';
import { SubscriptionCard } from './subscription-card';
import { SubscriptionForm } from './subscription-form';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export function SubscriptionList() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const t = useTranslations('Subscription');
  const tCommon = useTranslations('Common');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  const fetchSubscriptions = useCallback(async () => {
    if (!user) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/subscriptions`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data: Subscription[] = await res.json();
        setSubscriptions(data);
      } else {
        setSubscriptions([]);
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchSubscriptions();
    }
  }, [fetchSubscriptions, authLoading]);

  const handleCreate = async (data: SubscriptionInput) => {
    const res = await fetch(`${API_URL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchSubscriptions();
    }
  };

  const handleUpdate = async (data: SubscriptionInput) => {
    if (!editingSubscription) return;
    const res = await fetch(
      `${API_URL}/subscriptions/${editingSubscription.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      },
    );
    if (res.ok) {
      await fetchSubscriptions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    const res = await fetch(`${API_URL}/subscriptions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      await fetchSubscriptions();
    }
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingSubscription(null);
    }
  };

  const columnLabels = {
    name: t('columns.name'),
    category: t('columns.category'),
    price: t('columns.price'),
    discount: t('columns.discount'),
    cycle: t('columns.cycle'),
    nextBilling: t('columns.nextBilling'),
    status: t('columns.status'),
    active: t('status.active'),
    inactive: t('status.inactive'),
    billingCycleShort: {
      monthly: t('billingCycleShort.monthly'),
      yearly: t('billingCycleShort.yearly'),
      weekly: t('billingCycleShort.weekly'),
      quarterly: t('billingCycleShort.quarterly'),
    },
  };

  const columns = useMemo(
    () => getColumns({ onEdit: handleEdit, onDelete: handleDelete, labels: columnLabels }),
    [handleEdit, handleDelete, columnLabels],
  );

  const monthlyTotal = subscriptions
    .filter((s) => s.isActive)
    .reduce((sum, s) => {
      let monthlyPrice = s.price;
      if (s.billingCycle === 'yearly') monthlyPrice = s.price / 12;
      if (s.billingCycle === 'weekly') monthlyPrice = s.price * 4;
      if (s.billingCycle === 'quarterly') monthlyPrice = s.price / 3;
      return sum + monthlyPrice;
    }, 0);

  const yearlyTotal = monthlyTotal * 12;
  const activeCount = subscriptions.filter((s) => s.isActive).length;

  if (authLoading || loading) {
    return <div className="text-center text-muted-foreground">{tCommon('loading')}</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 rounded-full bg-muted p-6">
          <LogIn className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">{t('loginRequired')}</h2>
        <p className="mb-6 text-muted-foreground">
          {t('loginRequiredDesc')}
        </p>
        <Button size="lg" onClick={() => router.push('/login')}>
          <LogIn className="mr-2 h-5 w-5" />
          {tCommon('login')}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t('thisMonth')}</p>
          <p className="text-2xl font-bold">
            ₩{Math.round(monthlyTotal).toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t('activeCount')}</p>
          <p className="text-2xl font-bold">{t('count', { count: activeCount })}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t('yearly')}</p>
          <p className="text-2xl font-bold">
            ₩{Math.round(yearlyTotal).toLocaleString()}
          </p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">{t('title')}</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                {t('listView')}
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'card' ? 'default' : 'outline'}
                onClick={() => setViewMode('card')}
              >
                {t('cardView')}
              </Button>
            </div>
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t('add')}
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <DataTable
            columns={columns}
            data={subscriptions}
            searchKey="name"
            searchPlaceholder={t('searchPlaceholder')}
          />
        ) : subscriptions.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border p-6 text-center text-muted-foreground">
            {t('noData')}
          </div>
        )}
      </section>

      <SubscriptionForm
        open={formOpen}
        onOpenChange={handleFormClose}
        subscription={editingSubscription}
        onSubmit={editingSubscription ? handleUpdate : handleCreate}
      />
    </div>
  );
}
