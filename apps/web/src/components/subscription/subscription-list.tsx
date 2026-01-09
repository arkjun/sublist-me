'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, LogIn } from 'lucide-react'
import type { Subscription, SubscriptionInput } from '@magami/db/types'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { getColumns } from './columns'
import { SubscriptionForm } from './subscription-form'
import { useAuth } from '@/components/auth/auth-provider'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export function SubscriptionList() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

  const fetchSubscriptions = useCallback(async () => {
    if (!user) {
      setSubscriptions([])
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`${API_URL}/subscriptions`, {
        credentials: 'include',
      })
      if (res.ok) {
        const data: Subscription[] = await res.json()
        setSubscriptions(data)
      } else {
        setSubscriptions([])
      }
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
      setSubscriptions([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading) {
      fetchSubscriptions()
    }
  }, [fetchSubscriptions, authLoading])

  const handleCreate = async (data: SubscriptionInput) => {
    const res = await fetch(`${API_URL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (res.ok) {
      await fetchSubscriptions()
    }
  }

  const handleUpdate = async (data: SubscriptionInput) => {
    if (!editingSubscription) return
    const res = await fetch(`${API_URL}/subscriptions/${editingSubscription.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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
      credentials: 'include',
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

  const columns = useMemo(
    () => getColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    []
  )

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

  if (authLoading || loading) {
    return <div className="text-center text-muted-foreground">로딩 중...</div>
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 rounded-full bg-muted p-6">
          <LogIn className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">로그인이 필요합니다</h2>
        <p className="mb-6 text-muted-foreground">
          구독 서비스를 관리하려면 먼저 로그인해주세요.
        </p>
        <Button size="lg" onClick={() => router.push('/login')}>
          <LogIn className="mr-2 h-5 w-5" />
          로그인
        </Button>
      </div>
    )
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

        <DataTable
          columns={columns}
          data={subscriptions}
          searchKey="name"
          searchPlaceholder="구독명으로 검색..."
        />
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
