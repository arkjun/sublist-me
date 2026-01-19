import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

declare const crypto: {
  randomUUID: () => string;
};

// 납부 주기
export type BillingCycle = 'monthly' | 'yearly' | 'weekly' | 'quarterly';

// 통화
export type Currency = 'KRW' | 'USD' | 'JPY' | 'EUR';

// 지원 언어
export type Locale = 'ko' | 'en' | 'ja';

// 다국어 이름 타입
export type LocalizedNames = Partial<Record<Locale, string>>;

// 서비스 카테고리 타입
export type ServiceCategory =
  | 'ott'
  | 'music'
  | 'gaming'
  | 'shopping'
  | 'productivity'
  | 'cloud'
  | 'news'
  | 'fitness'
  | 'education'
  | 'finance'
  | 'food'
  | 'security'
  | 'other';

// 사용자 테이블
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  googleId: text('google_id').notNull().unique(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  name: text('name'),
  picture: text('picture'),
  locale: text('locale').$type<Locale>().notNull().default('ko'),
  currency: text('currency').$type<Currency>().notNull().default('KRW'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

// 세션 테이블
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
});

// 구독 테이블
export const subscriptions = sqliteTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  // 사용자 연결
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  // 기본 정보
  name: text('name').notNull(), // 구독명 (예: 유튜브 프리미엄)
  description: text('description'), // 설명

  // 가격 정보
  price: real('price').notNull(), // 내가 내는 가격
  originalPrice: real('original_price'), // 정가 (비교용)
  currency: text('currency').$type<Currency>().notNull().default('KRW'),

  // 납부 정보
  billingCycle: text('billing_cycle')
    .$type<BillingCycle>()
    .notNull()
    .default('monthly'),
  nextBillingDate: text('next_billing_date'), // ISO 8601 format
  startDate: text('start_date'), // 구독 시작일

  // 추가 정보
  country: text('country').default('KR'), // 국가 코드
  category: text('category'), // 카테고리 (예: 엔터테인먼트, 생산성)
  url: text('url'), // 서비스 URL
  logoUrl: text('logo_url'), // 서비스 로고 URL
  memo: text('memo'), // 메모

  // 상태
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),

  // 타임스탬프
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

// 카테고리 테이블 (나중에 확장 가능)
export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  color: text('color'), // HEX color
  icon: text('icon'), // 아이콘 이름
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});
