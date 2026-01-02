import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type { subscriptions, categories } from './schema'

// Subscription types
export type Subscription = InferSelectModel<typeof subscriptions>
export type NewSubscription = InferInsertModel<typeof subscriptions>

// Client-side subscription input (userId is auto-added by API)
export type SubscriptionInput = Omit<NewSubscription, 'userId'>

// Category types
export type Category = InferSelectModel<typeof categories>
export type NewCategory = InferInsertModel<typeof categories>

// Re-export schema types
export type { BillingCycle, Currency } from './schema'
