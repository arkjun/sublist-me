// Username validation constants
const MIN_LENGTH = 3;
const MAX_LENGTH = 20;
const USERNAME_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;

// Reserved usernames that cannot be used
const RESERVED_USERNAMES = [
  'admin',
  'api',
  'www',
  'login',
  'logout',
  'signup',
  'settings',
  'profile',
  'help',
  'support',
  'about',
  'contact',
  'privacy',
  'terms',
  'user',
  'users',
  'root',
  'system',
  'mail',
  'email',
  'auth',
  'account',
  'dashboard',
];

// Adjectives for random username generation
const ADJECTIVES = [
  'happy',
  'cool',
  'swift',
  'brave',
  'calm',
  'eager',
  'fair',
  'glad',
  'kind',
  'nice',
  'keen',
  'bold',
  'warm',
  'wise',
  'wild',
  'free',
  'neat',
  'pure',
  'safe',
  'true',
  'fast',
  'slim',
  'soft',
  'tiny',
  'vast',
  'gold',
  'mint',
  'blue',
  'pink',
  'jade',
];

// Nouns for random username generation
const NOUNS = [
  'fox',
  'owl',
  'wolf',
  'bear',
  'lion',
  'deer',
  'hawk',
  'dove',
  'swan',
  'seal',
  'puma',
  'lynx',
  'crow',
  'hare',
  'moth',
  'fish',
  'duck',
  'goat',
  'frog',
  'crab',
  'star',
  'moon',
  'leaf',
  'tree',
  'wave',
  'wind',
  'rain',
  'snow',
  'hill',
  'lake',
];

export type UsernameValidationResult =
  | { valid: true }
  | { valid: false; error: string };

/**
 * Validates a username against the rules
 */
export function validateUsername(username: string): UsernameValidationResult {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username is required' };
  }

  const trimmed = username.trim().toLowerCase();

  if (trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      error: `Username must be at least ${MIN_LENGTH} characters`,
    };
  }

  if (trimmed.length > MAX_LENGTH) {
    return {
      valid: false,
      error: `Username must be at most ${MAX_LENGTH} characters`,
    };
  }

  if (!USERNAME_REGEX.test(trimmed)) {
    return {
      valid: false,
      error:
        'Username must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen',
    };
  }

  if (trimmed.includes('--')) {
    return {
      valid: false,
      error: 'Username cannot contain consecutive hyphens',
    };
  }

  if (RESERVED_USERNAMES.includes(trimmed)) {
    return { valid: false, error: 'This username is reserved' };
  }

  return { valid: true };
}

/**
 * Generates a random username in the format: adjective-noun-number
 */
export function generateUsername(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}-${noun}-${number}`;
}

/**
 * Generates a unique username by checking availability in the database
 */
export async function generateUniqueUsername(
  checkExists: (username: string) => Promise<boolean>,
  maxAttempts = 10,
): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const username = generateUsername();
    const exists = await checkExists(username);
    if (!exists) {
      return username;
    }
  }

  // Fallback: use timestamp-based username
  const fallback = `user-${Date.now().toString(36)}`;
  return fallback;
}
