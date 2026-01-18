# SubList Me (サブリストミー)

サブスクリプションサービスを一括管理するアプリ

[English](./README.md) | [한국어](./README.ko.md)

## 機能

- サブスクリプションサービスの登録・管理
- 人気サービスカタログで素早く登録
- 月別/年間の支出状況確認
- 定価との割引率比較
- 次回決済日の追跡
- リスト/カードビュー切替
- ライト/ダーク/システムテーマ対応
- 多言語対応（日本語、英語、韓国語）
- 複数の認証方式（メール/パスワード、Google OAuth）

## 技術スタック

| 区分 | 技術 |
|------|------|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| API | Hono (Cloudflare Workers) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle |
| 認証 | Lucia + Arctic (Google OAuth, Email/Password) |
| 型共有 | Hono RPC |
| リンター | Biome |

## プロジェクト構造

```
sublist-me/
├── apps/
│   ├── api/          # Hono API (Cloudflare Workers)
│   ├── web/          # Next.js Webアプリ (Cloudflare Pages)
│   └── www/          # Next.js マーケティングサイト
└── packages/
    └── db/           # Drizzle スキーマ (共有)
```

## はじめに

### 前提条件

- Node.js >= 20
- pnpm >= 9.15

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. Cloudflare D1 データベースの作成

```bash
cd apps/api
wrangler d1 create sublistme-db
```

出力された `database_id` を `apps/api/wrangler.toml` にコピー：

```toml
[[d1_databases]]
binding = "DB"
database_name = "sublistme-db"
database_id = "YOUR_DATABASE_ID"  # ここに貼り付け
```

### 3. マイグレーション

```bash
# スキーマからSQLを生成
pnpm db:generate

# ローカルD1に適用
pnpm db:migrate
```

### 4. 開発サーバーの起動

```bash
# API + Web 同時起動
pnpm dev

# または個別に起動
pnpm dev:api   # http://localhost:8787
pnpm dev:web   # http://localhost:3000
```

## スクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | すべての開発サーバーを起動 |
| `pnpm build` | すべてのパッケージをビルド |
| `pnpm lint` | Biome リントを実行 |
| `pnpm lint:fix` | リント問題を自動修正 |
| `pnpm format` | Biome でコードフォーマット |
| `pnpm test` | API テストを実行 |
| `pnpm test:e2e` | Playwright E2E テストを実行 |

## デプロイ

### 1. API デプロイ (Cloudflare Workers)

```bash
cd apps/api

# 本番DBマイグレーション
wrangler d1 migrations apply sublistme-db

# Workers デプロイ
wrangler deploy
```

デプロイ後のAPI URL: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev`

### 2. Web デプロイ (Cloudflare Pages)

```bash
cd apps/web

# 環境変数とともにビルド＆デプロイ
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev pnpm deploy
```

または Cloudflare Pages ダッシュボードで Git リポジトリを接続して自動デプロイ。

## 環境変数

| 変数 | 説明 | 例 |
|------|------|-----|
| `NEXT_PUBLIC_API_URL` | API サーバー URL | `http://localhost:8787` (開発) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | - |
| `GOOGLE_REDIRECT_URI` | OAuth コールバック URL | `http://localhost:8787/auth/callback/google` |

### apps/web/.env.local (開発用)

```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### apps/api/.dev.vars (開発用)

```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Cloudflare Pages 環境変数 (本番)

Cloudflare ダッシュボード > Pages > プロジェクト設定 > Environment variables:

```
NEXT_PUBLIC_API_URL=https://sublistme-api.YOUR_SUBDOMAIN.workers.dev
```

### Cloudflare Workers Secrets (本番)

```bash
cd apps/api
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## Google OAuth 設定

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client IDs
3. Application type: Web application
4. Authorized redirect URIs を追加:
   - 開発: `http://localhost:8787/auth/callback/google`
   - 本番: `https://sublistme-api.YOUR_SUBDOMAIN.workers.dev/auth/callback/google`
5. Client ID と Client Secret を環境変数に設定

## ライセンス

MIT
