# SubList Me (서브리스트미)

구독 서비스를 한눈에 관리하는 앱

[English](./README.md) | [日本語](./README.ja.md)

## 기능

- 구독 서비스 등록 및 관리
- 월별/연간 지출 현황 확인
- 정가 대비 할인율 비교
- 다음 결제일 알림
- 라이트/다크/시스템 테마 지원
- 다양한 로그인 방식 (이메일/비밀번호, Google OAuth)

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| API | Hono (Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle |
| 인증 | Lucia + Arctic (Google OAuth, Email/Password) |
| 타입 공유 | Hono RPC |
| 린팅 | Biome |

## 프로젝트 구조

```
sublistme/
├── apps/
│   ├── api/          # Hono API (Cloudflare Workers)
│   └── web/          # Next.js 웹앱 (Cloudflare Pages)
└── packages/
    └── db/           # Drizzle 스키마 (공유)
```

## 시작하기

### 사전 요구사항

- Node.js >= 20
- pnpm >= 9.15

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Cloudflare D1 데이터베이스 생성

```bash
cd apps/api
wrangler d1 create sublistme-db
```

출력된 `database_id`를 `apps/api/wrangler.toml`에 복사:

```toml
[[d1_databases]]
binding = "DB"
database_name = "sublistme-db"
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

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 모든 개발 서버 시작 |
| `pnpm build` | 모든 패키지 빌드 |
| `pnpm lint` | Biome 린트 실행 |
| `pnpm lint:fix` | 린트 문제 자동 수정 |
| `pnpm format` | Biome로 코드 포맷팅 |
| `pnpm test` | API 테스트 실행 |
| `pnpm test:e2e` | Playwright E2E 테스트 실행 |

## 배포

### 1. API 배포 (Cloudflare Workers)

```bash
cd apps/api

# 프로덕션 DB 마이그레이션
wrangler d1 migrations apply sublistme-db

# Workers 배포
wrangler deploy
```

배포 후 API URL: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev`

### 2. Web 배포 (Cloudflare Pages)

```bash
cd apps/web

# 환경 변수와 함께 빌드 & 배포
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev pnpm deploy
```

또는 Cloudflare Pages 대시보드에서 Git 저장소 연결로 자동 배포.

## 환경 변수

| 변수 | 설명 | 예시 |
|------|------|------|
| `NEXT_PUBLIC_API_URL` | API 서버 URL | `http://localhost:8787` (개발) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - |
| `GOOGLE_REDIRECT_URI` | OAuth 콜백 URL | `http://localhost:8787/auth/callback/google` |

### apps/web/.env.local (개발용)

```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### apps/api/.dev.vars (개발용)

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Cloudflare Pages 환경 변수 (프로덕션)

Cloudflare 대시보드 > Pages > 프로젝트 설정 > Environment variables:

```
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev
```

### Cloudflare Workers Secrets (프로덕션)

```bash
cd apps/api
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client IDs
3. Application type: Web application
4. Authorized redirect URIs 추가:
   - 개발: `http://localhost:8787/auth/callback/google`
   - 프로덕션: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev/auth/callback/google`
5. Client ID와 Client Secret을 환경 변수에 설정

## 라이센스

MIT
