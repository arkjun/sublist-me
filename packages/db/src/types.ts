import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type { subscriptions, categories, serviceProviders } from './schema'

// Subscription types
export type Subscription = InferSelectModel<typeof subscriptions>
export type NewSubscription = InferInsertModel<typeof subscriptions>

// Client-side subscription input (userId is auto-added by API)
export type SubscriptionInput = Omit<NewSubscription, 'userId'>

// Category types
export type Category = InferSelectModel<typeof categories>
export type NewCategory = InferInsertModel<typeof categories>

export type ServiceProvider = InferSelectModel<typeof serviceProviders>
export type NewServiceProvider = InferInsertModel<typeof serviceProviders>

// Re-export schema types
export type { BillingCycle, Currency } from './schema'
