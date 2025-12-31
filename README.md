# Magami (마감이)

구독 서비스를 한눈에 관리하는 앱

## 기능

- 구독 서비스 등록 및 관리
- 월별/연간 지출 현황 확인
- 정가 대비 할인율 비교
- 다음 결제일 알림

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| API | Hono (Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle |
| 타입 공유 | Hono RPC |

## 프로젝트 구조

```
magami/
├── apps/
│   ├── api/          # Hono API (Cloudflare Workers)
│   └── web/          # Next.js 웹앱 (Cloudflare Pages)
└── packages/
    └── db/           # Drizzle 스키마 (공유)
```

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Cloudflare D1 데이터베이스 생성

```bash
cd apps/api
wrangler d1 create magami-db
```

출력된 `database_id`를 `apps/api/wrangler.toml`에 복사:

```toml
[[d1_databases]]
binding = "DB"
database_name = "magami-db"
database_id = "YOUR_DATABASE_ID"  # 여기에 붙여넣기
```

### 3. 마이그레이션

```bash
# 스키마에서 SQL 생성
pnpm db:generate

# 로컬 D1에 적용
pnpm db:migrate
```

### 4. 개발 서버 실행

```bash
# API + Web 동시 실행
pnpm dev

# 또는 개별 실행
pnpm dev:api   # http://localhost:8787
pnpm dev:web   # http://localhost:3000
```

## 배포

### API (Cloudflare Workers)

```bash
cd apps/api
wrangler deploy
```

### Web (Cloudflare Pages)

```bash
cd apps/web
pnpm build
# Cloudflare Pages에 out/ 폴더 연결
```

## 환경 변수

### apps/web/.env.local

```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

## 라이센스

MIT
