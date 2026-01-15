'use client';

import type { Subscription } from '@sublistme/db/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const billingCycleLabels: Record<string, string> = {
  monthly: '월',
  yearly: '년',
  weekly: '주',
  quarterly: '분기',
};

const currencySymbols: Record<string, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
  EUR: '€',
};

function formatPrice(price: number, currency: string) {
  const symbol = currencySymbols[currency] || currency;
  if (currency === 'KRW' || currency === 'JPY') {
    return `${symbol}${price.toLocaleString()}`;
  }
  return `${symbol}${price.toFixed(2)}`;
}

interface ColumnOptions {
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

export function getColumns({
  onEdit,
  onDelete,
}: ColumnOptions): ColumnDef<Subscription>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            구독명
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const logoUrl = row.original.logoUrl;
        return (
          <div className="flex items-center gap-2">
            {logoUrl && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded border bg-white">
                <img
                  src={logoUrl}
                  alt=""
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <span className="font-medium">{row.getValue('name')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: '카테고리',
      cell: ({ row }) => {
        const category = row.getValue('category') as string | null;
        if (!category) return <span className="text-muted-foreground">-</span>;
        return (
          <span className="rounded-full bg-secondary px-2 py-1 text-xs">
            {category}
          </span>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            가격
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        const currency = row.original.currency;
        const billingCycle = row.original.billingCycle;
        const cycleLabel = billingCycleLabels[billingCycle] || billingCycle;

        return (
          <div>
            {formatPrice(price, currency)}
            <span className="text-muted-foreground"> / {cycleLabel}</span>
          </div>
        );
      },
    },
    {
      id: 'discount',
      header: '할인율',
      cell: ({ row }) => {
        const price = row.original.price;
        const originalPrice = row.original.originalPrice;
        if (!originalPrice || originalPrice <= price) {
          return <span className="text-muted-foreground">-</span>;
        }
        const discount = Math.round((1 - price / originalPrice) * 100);
        return <span className="text-green-600 font-medium">{discount}%</span>;
      },
    },
    {
      accessorKey: 'billingCycle',
      header: '주기',
      cell: ({ row }) => {
        const cycle = row.getValue('billingCycle') as string;
        return billingCycleLabels[cycle] || cycle;
      },
    },
    {
      accessorKey: 'nextBillingDate',
      header: '다음 결제일',
      cell: ({ row }) => {
        const nextBillingDate = row.getValue('nextBillingDate') as
          | string
          | null;
        if (!nextBillingDate) {
          return <span className="text-muted-foreground">-</span>;
        }
        return nextBillingDate;
      },
    },
    {
      accessorKey: 'isActive',
      header: '상태',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs ${
              isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isActive ? '활성' : '비활성'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const subscription = row.original;
        return (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(subscription)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(subscription.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];
}
