import type { AppType } from '@sublistme/api';
import type { Currency, Locale } from '@sublistme/db/types';
import { hc } from 'hono/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

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

// Username API functions
export async function fetchUsername(): Promise<{ username: string }> {
  const res = await fetch(`${API_URL}/users/username`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch username');
  }

  return res.json();
}

export async function updateUsername(
  username: string,
): Promise<{ username: string }> {
  const res = await fetch(`${API_URL}/users/username`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    const error = (await res.json()) as { error?: string };
    throw new Error(error.error || 'Failed to update username');
  }

  return res.json();
}

export async function checkUsernameAvailability(
  username: string,
): Promise<{ available: boolean; error?: string }> {
  const res = await fetch(
    `${API_URL}/users/username/check?username=${encodeURIComponent(username)}`,
    {
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to check username availability');
  }

  return res.json();
}
