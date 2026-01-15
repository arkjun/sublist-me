/**
 * Seed script for service providers
 *
 * Usage:
 *   pnpm run seed         # seed to local D1
 *   pnpm run seed:remote  # seed to remote D1 (production)
 */

import { serviceProviderSeeds } from '@sublistme/db/seeds';

// Generate SQL INSERT statements
function generateSeedSQL(): string {
  const statements: string[] = [];

  for (const provider of serviceProviderSeeds) {
    const id = crypto.randomUUID();
    const names = JSON.stringify(provider.names);
    const categories = JSON.stringify(provider.categories);
    const url = provider.url || '';
    const logoUrl = provider.logoUrl || '';

    // Escape single quotes in JSON
    const escapedNames = names.replace(/'/g, "''");
    const escapedCategories = categories.replace(/'/g, "''");

    statements.push(`
INSERT INTO service_providers (id, slug, names, url, logo_url, categories, created_at, updated_at)
VALUES (
  '${id}',
  '${provider.slug}',
  '${escapedNames}',
  '${url}',
  '${logoUrl}',
  '${escapedCategories}',
  datetime('now'),
  datetime('now')
) ON CONFLICT(slug) DO UPDATE SET
  names = excluded.names,
  url = excluded.url,
  logo_url = excluded.logo_url,
  categories = excluded.categories,
  updated_at = datetime('now');`);
  }

  return statements.join('\n');
}

// Output SQL to stdout
console.log('-- Service Providers Seed Data');
console.log(`-- Generated at: ${new Date().toISOString()}`);
console.log(`-- Total providers: ${serviceProviderSeeds.length}`);
console.log('');
console.log(generateSeedSQL());
