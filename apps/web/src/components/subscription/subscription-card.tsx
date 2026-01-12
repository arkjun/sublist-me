'use client'

import { Pencil, Trash2 } from 'lucide-react'
import type { Subscription } from '@magami/db/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SubscriptionCardProps {
  subscription: Subscription
  onEdit: (subscription: Subscription) => void
  onDelete: (id: string) => void
}

const billingCycleLabels: Record<string, string> = {
  monthly: '월',
  yearly: '년',
  weekly: '주',
  quarterly: '분기',
}

const currencySymbols: Record<string, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
  EUR: '€',
}

function formatPrice(price: number, currency: string) {
  const symbol = currencySymbols[currency] || currency
  if (currency === 'KRW' || currency === 'JPY') {
    return `${symbol}${price.toLocaleString()}`
  }
  return `${symbol}${price.toFixed(2)}`
}

export function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
}: SubscriptionCardProps) {
  const cycleLabel = billingCycleLabels[subscription.billingCycle] || subscription.billingCycle

  return (
    <Card className="group">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{subscription.name}</h3>
            {subscription.category && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {subscription.category}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {formatPrice(subscription.price, subscription.currency)} / {cycleLabel}
            {subscription.originalPrice && subscription.originalPrice > subscription.price && (
              <span className="ml-2 text-green-600">
                ({Math.round((1 - subscription.price / subscription.originalPrice) * 100)}% 할인)
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            다음 결제일: {subscription.nextBillingDate || '-'}
          </p>
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
      </CardContent>
    </Card>
  )
}
