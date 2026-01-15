import type { AppType } from '@sublistme/api';
import type { Currency, Locale } from '@sublistme/db/types';
import { hc } from 'hono/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

// @ts-expect-error Hono client type compatibility issue
export const api = hc<AppType>(API_URL);

export type UserPreferences = {
  locale: Locale;
  currency: Currency;
};

export async function fetchUserPreferences(): Promise<UserPreferences> {
  const res = await fetch(`${API_URL}/users/preferences`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch preferences');
  }

  return res.json();
}

export async function updateUserPreferences(
  preferences: Partial<UserPreferences>,
): Promise<UserPreferences> {
  const res = await fetch(`${API_URL}/users/preferences`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(preferences),
  });

  if (!res.ok) {
    const error = (await res.json()) as { error?: string };
    throw new Error(error.error || 'Failed to update preferences');
  }

  return res.json();
}
