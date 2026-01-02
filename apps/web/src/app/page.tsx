import { SubscriptionList } from '@/components/subscription/subscription-list'

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Magami</h1>
        <p className="text-muted-foreground">내 구독을 한눈에 관리하세요</p>
      </header>

      <SubscriptionList />
    </main>
  )
}
