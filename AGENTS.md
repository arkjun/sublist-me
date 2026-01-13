# SubList Me Project Guide for AI Agents

## Overview

서브리스트미는 구독 서비스 관리 앱입니다. 사용자가 구독 중인 서비스들을 등록하고 월별/연간 지출을 추적할 수 있습니다.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Hono (Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle
- **Auth**: Lucia + Arctic (Google OAuth, Email/Password with scrypt)
- **Monorepo**: pnpm workspaces, Turborepo

## Project Structure

```
sublistme/
├── apps/
│   ├── api/                    # Hono API (Cloudflare Workers)
│   │   ├── src/
│   │   │   ├── index.ts        # API entry point
│   │   │   ├── lib/auth.ts     # Lucia auth setup
│   │   │   ├── middleware/     # Auth middleware
│   │   │   └── routes/         # API routes
│   │   │       ├── auth.ts     # Auth endpoints (Google OAuth, Email)
│   │   │       └── subscriptions.ts  # Subscription CRUD
│   │   ├── scripts/            # CLI scripts
│   │   │   └── seed.ts         # Seed data generator
│   │   └── migrations/         # Drizzle migrations
│   └── web/                    # Next.js frontend
│       └── src/
│           ├── app/            # Next.js App Router
│           │   ├── layout.tsx  # Root layout with providers
│           │   ├── page.tsx    # Home page
│           │   └── login/      # Login page
│           ├── components/
│           │   ├── auth/       # Auth provider
│           │   ├── subscription/  # Subscription components
│           │   ├── theme/      # Theme provider & toggle
│           │   ├── ui/         # shadcn/ui components
│           │   └── header.tsx  # App header
│           └── lib/            # Utilities
└── packages/
    └── db/                     # Shared database schema
        └── src/
            ├── schema.ts       # Drizzle schema
            ├── types.ts        # Shared TypeScript types
            └── seeds/          # Seed data
                └── service-providers.ts  # Subscription service providers (55 services, 3 languages)
```

## Key Files

### API (apps/api)

| File | Description |
|------|-------------|
| `src/index.ts` | Hono app entry, CORS config, route registration |
| `src/lib/auth.ts` | Lucia & Google OAuth setup, scrypt password hashing |
| `src/routes/auth.ts` | Auth endpoints: Google OAuth, Email login/signup, logout |
| `src/routes/subscriptions.ts` | Subscription CRUD with user isolation |
| `src/middleware/auth.ts` | Session validation middleware |

### Web (apps/web)

| File | Description |
|------|-------------|
| `src/app/layout.tsx` | Root layout, ThemeProvider, AuthProvider |
| `src/app/login/page.tsx` | Login/Signup page with tabs |
| `src/components/auth/auth-provider.tsx` | Auth context, login/logout functions |
| `src/components/subscription/subscription-list.tsx` | Main subscription list with stats |
| `src/components/theme/theme-toggle.tsx` | Light/Dark/System theme switcher |

### Database (packages/db)

| File | Description |
|------|-------------|
| `src/schema.ts` | Drizzle schema: users, sessions, subscriptions, categories, serviceProviders |
| `src/types.ts` | Shared TypeScript types exported to apps |
| `src/seeds/service-providers.ts` | 55개 구독 서비스 seed 데이터 (한/영/일 3개국어) |

#### Service Providers Schema

```typescript
serviceProviders = {
  id: text (UUID),
  slug: text (unique),           // 'netflix', 'youtube-premium'
  names: JSON,                   // {"ko": "넷플릭스", "en": "Netflix", "ja": "ネットフリックス"}
  url: text,
  logoUrl: text,
  categories: JSON,              // ["ott", "music"]
  createdAt, updatedAt
}
```

**Categories**: `ott`, `music`, `gaming`, `shopping`, `productivity`, `cloud`, `news`, `fitness`, `education`, `finance`, `food`, `other`

**Locales**: `ko` (한국어), `en` (English), `ja` (日本語)

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/login/google` | Start Google OAuth flow |
| GET | `/auth/callback/google` | Google OAuth callback |
| POST | `/auth/signup/email` | Email signup |
| POST | `/auth/login/email` | Email login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Get current user |

### Subscriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subscriptions` | List user's subscriptions |
| POST | `/subscriptions` | Create subscription |
| PUT | `/subscriptions/:id` | Update subscription |
| DELETE | `/subscriptions/:id` | Delete subscription |

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Run API + Web concurrently
pnpm dev:api          # API only (http://localhost:8787)
pnpm dev:web          # Web only (http://localhost:3000)
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Apply migrations to local D1
pnpm db:seed          # Seed service providers to local D1
pnpm db:seed:prod     # Seed service providers to production D1
pnpm test             # Run tests
```

## Code Conventions

### TypeScript
- Strict mode enabled
- Use `interface` for object types, `type` for unions/primitives
- Prefer `const` over `let`

### React/Next.js
- Use App Router (`app/` directory)
- Client components marked with `'use client'`
- Server components by default
- Use shadcn/ui components from `@/components/ui`

### API
- Use Hono's type-safe routing
- All routes require auth except `/auth/*`
- Return JSON responses with proper status codes
- User data isolation via `userId` in queries

### Styling
- Tailwind CSS with shadcn/ui design tokens
- Dark mode via CSS variables in `globals.css`
- Use `cn()` utility for conditional classes

## Testing

### Test Framework
- **Framework**: Vitest
- **Test files**: `*.test.ts`
- **Run tests**: `pnpm test`
- **Coverage**: `coverage/` directory

### Test Policy

| Test Type | Required | When to Write |
|-----------|----------|---------------|
| **Unit Test** | **Always** | 모든 새 함수, 유틸리티, 비즈니스 로직에 필수 작성 |
| Integration Test | As Needed | API 엔드포인트, DB 연동, 외부 서비스 연동 시 |
| E2E Test | As Needed | 중요 사용자 플로우, 결제 등 크리티컬 기능 시 |

### Unit Test Guidelines
- 모든 새 코드에는 Unit Test 작성 필수
- 테스트 파일은 소스 파일과 같은 디렉토리에 위치 (예: `auth.ts` → `auth.test.ts`)
- 각 함수/메서드에 대해 정상 케이스와 엣지 케이스 모두 테스트
- Mock은 외부 의존성에만 사용, 내부 로직은 실제 동작 테스트

### Integration/E2E Test Guidelines
- API 엔드포인트 변경 시 Integration Test 권장
- 사용자 인증, 결제 등 크리티컬 플로우는 E2E Test 권장
- CI/CD 파이프라인에서 실행 시간 고려하여 작성

## Environment Variables

### API (.dev.vars / Cloudflare Secrets)
```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=http://localhost:8787/auth/callback/google
FRONTEND_URL=http://localhost:3000
```

### Web (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8787
```
