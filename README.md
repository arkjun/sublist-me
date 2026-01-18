# SubList Me

A subscription management app to track all your subscriptions in one place.

[한국어](./README.ko.md) | [日本語](./README.ja.md)

## Features

- Register and manage subscription services
- Service catalogue with popular services for quick registration
- View monthly/yearly spending overview
- Compare discount rates against regular prices
- Next payment date tracking
- List/Card view toggle
- Light/Dark/System theme support
- Multi-language support (English, Korean, Japanese)
- Multiple authentication methods (Email/Password, Google OAuth)

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| API | Hono (Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle |
| Auth | Lucia + Arctic (Google OAuth, Email/Password) |
| Type Sharing | Hono RPC |
| Linting | Biome |

## Project Structure

```
sublist-me/
├── apps/
│   ├── api/          # Hono API (Cloudflare Workers)
│   ├── web/          # Next.js web app (Cloudflare Pages)
│   └── www/          # Next.js marketing site
└── packages/
    └── db/           # Drizzle schema (shared)
```

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9.15

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Create Cloudflare D1 Database

```bash
cd apps/api
wrangler d1 create sublistme-db
```

Copy the output `database_id` to `apps/api/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "sublistme-db"
database_id = "YOUR_DATABASE_ID"  # paste here
```

### 3. Run Migrations

```bash
# Generate SQL from schema
pnpm db:generate

# Apply to local D1
pnpm db:migrate
```

### 4. Start Development Server

```bash
# Run API + Web simultaneously
pnpm dev

# Or run individually
pnpm dev:api   # http://localhost:8787
pnpm dev:web   # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all development servers |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run Biome linting |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Format code with Biome |
| `pnpm test` | Run API tests |
| `pnpm test:e2e` | Run Playwright E2E tests |

## Deployment

### 1. Deploy API (Cloudflare Workers)

```bash
cd apps/api

# Run production DB migration
wrangler d1 migrations apply sublistme-db

# Deploy Workers
wrangler deploy
```

API URL after deployment: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev`

### 2. Deploy Web (Cloudflare Pages)

```bash
cd apps/web

# Build & deploy with environment variables
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev pnpm deploy
```

Or connect Git repository in Cloudflare Pages dashboard for automatic deployment.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API server URL | `http://localhost:8787` (dev) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `http://localhost:8787/auth/callback/google` |

### apps/web/.env.local (Development)

```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### apps/api/.dev.vars (Development)

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Cloudflare Pages Environment Variables (Production)

Cloudflare Dashboard > Pages > Project Settings > Environment variables:

```
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev
```

### Cloudflare Workers Secrets (Production)

```bash
cd apps/api
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Go to APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client IDs
3. Application type: Web application
4. Add Authorized redirect URIs:
   - Development: `http://localhost:8787/auth/callback/google`
   - Production: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev/auth/callback/google`
5. Set Client ID and Client Secret in environment variables

## License

MIT
