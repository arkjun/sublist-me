-- Add service_providers table for subscription service seed data
CREATE TABLE `service_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`names` text NOT NULL,
	`url` text,
	`logo_url` text,
	`categories` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_providers_slug_unique` ON `service_providers` (`slug`);
