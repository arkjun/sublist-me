'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus } from 'lucide-react'
import type { Subscription, NewSubscription } from '@magami/db/types'
import { Button } from '@/components/ui/button'
import { SubscriptionCard } from './subscription-card'
import { SubscriptionForm } from './subscription-form'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:51332'

export function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

  const fetchSubscriptions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/subscriptions`)
      const data = await res.json()
      setSubscriptions(data)
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  const handleCreate = async (data: NewSubscription) => {
    const res = await fetch(`${API_URL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      await fetchSubscriptions()
    }
  }

  const handleUpdate = async (data: NewSubscription) => {
    if (!editingSubscription) return
    const res = await fetch(`${API_URL}/subscriptions/${editingSubscription.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      await fetchSubscriptions()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    const res = await fetch(`${API_URL}/subscriptions/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      await fetchSubscriptions()
    }
  }

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription)
    setFormOpen(true)
  }

  const handleFormClose = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setEditingSubscription(null)
    }
  }

  // 통계 계산
  const monthlyTotal = subscriptions
    .filter((s) => s.isActive)
    .reduce((sum, s) => {
      let monthlyPrice = s.price
      if (s.billingCycle === 'yearly') monthlyPrice = s.price / 12
      if (s.billingCycle === 'weekly') monthlyPrice = s.price * 4
      if (s.billingCycle === 'quarterly') monthlyPrice = s.price / 3
      return sum + monthlyPrice
    }, 0)

  const yearlyTotal = monthlyTotal * 12
  const activeCount = subscriptions.filter((s) => s.isActive).length

  if (loading) {
    return <div className="text-center text-muted-foreground">로딩 중...</div>
  }

  return (
    <div>
      {/* 요약 카드 */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">이번 달 지출</p>
          <p className="text-2xl font-bold">₩{Math.round(monthlyTotal).toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">활성 구독</p>
          <p className="text-2xl font-bold">{activeCount}개</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">연간 예상</p>
          <p className="text-2xl font-bold">₩{Math.round(yearlyTotal).toLocaleString()}</p>
        </div>
      </div>

      {/* 구독 목록 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">내 구독</h2>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            구독 추가
          </Button>
        </div>

        {subscriptions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">아직 등록된 구독이 없습니다</p>
            <p className="text-sm text-muted-foreground">
              첫 번째 구독을 추가해보세요
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
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
  )
}
