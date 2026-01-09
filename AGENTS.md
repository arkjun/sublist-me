# Magami Project Guide for AI Agents

## Overview

Magami는 구독 서비스 관리 앱입니다. 사용자가 구독 중인 서비스들을 등록하고 월별/연간 지출을 추적할 수 있습니다.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Hono (Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle
- **Auth**: Lucia + Arctic (Google OAuth, Email/Password with scrypt)
- **Monorepo**: pnpm workspaces, Turborepo

## Project Structure

```
magami/
├── apps/
│   ├── api/                    # Hono API (Cloudflare Workers)
│   │   └── src/
│   │       ├── index.ts        # API entry point
│   │       ├── lib/auth.ts     # Lucia auth setup
│   │       ├── middleware/     # Auth middleware
│   │       └── routes/         # API routes
│   │           ├── auth.ts     # Auth endpoints (Google OAuth, Email)
│   │           └── subscriptions.ts  # Subscription CRUD
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
            └── types.ts        # Shared TypeScript types
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
| `src/schema.ts` | Drizzle schema: users, sessions, subscriptions, categories |
| `src/types.ts` | Shared TypeScript types exported to apps |

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

- Test framework: Vitest
- Test files: `*.test.ts`
- Run tests: `pnpm test`
- Coverage located in `coverage/` directory

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
