import { Plus } from 'lucide-react'

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Magami</h1>
        <p className="text-muted-foreground">내 구독을 한눈에 관리하세요</p>
      </header>

      {/* 요약 카드 */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">이번 달 지출</p>
          <p className="text-2xl font-bold">₩0</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">활성 구독</p>
          <p className="text-2xl font-bold">0개</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">연간 예상</p>
          <p className="text-2xl font-bold">₩0</p>
        </div>
      </div>

      {/* 구독 목록 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">내 구독</h2>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            구독 추가
          </button>
        </div>

        {/* 빈 상태 */}
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">아직 등록된 구독이 없습니다</p>
          <p className="text-sm text-muted-foreground">
            첫 번째 구독을 추가해보세요
          </p>
        </div>
      </section>
    </main>
  )
}
