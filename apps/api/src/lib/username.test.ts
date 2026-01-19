import { describe, expect, it, vi } from 'vitest';
import {
  generateUniqueUsername,
  generateUsername,
  validateUsername,
} from './username';

describe('Username Library', () => {
  describe('validateUsername', () => {
    describe('valid usernames', () => {
      it('should accept valid simple username', () => {
        const result = validateUsername('john');
        expect(result).toEqual({ valid: true });
      });

      it('should accept username with numbers', () => {
        const result = validateUsername('john123');
        expect(result).toEqual({ valid: true });
      });

      it('should accept username with hyphens', () => {
        const result = validateUsername('john-doe');
        expect(result).toEqual({ valid: true });
      });

      it('should accept username with mixed characters', () => {
        const result = validateUsername('cool-user-42');
        expect(result).toEqual({ valid: true });
      });

      it('should accept minimum length username (3 chars)', () => {
        const result = validateUsername('abc');
        expect(result).toEqual({ valid: true });
      });

      it('should accept maximum length username (20 chars)', () => {
        const result = validateUsername('abcdefghij1234567890');
        expect(result).toEqual({ valid: true });
      });

      it('should accept single character with number', () => {
        const result = validateUsername('a1b');
        expect(result).toEqual({ valid: true });
      });

      it('should normalize uppercase to lowercase', () => {
        const result = validateUsername('JohnDoe');
        expect(result).toEqual({ valid: true });
      });

      it('should trim whitespace', () => {
        const result = validateUsername('  john  ');
        expect(result).toEqual({ valid: true });
      });
    });

    describe('invalid usernames - length', () => {
      it('should reject empty string', () => {
        const result = validateUsername('');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username is required');
        }
      });

      it('should reject username shorter than 3 characters', () => {
        const result = validateUsername('ab');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username must be at least 3 characters');
        }
      });

      it('should reject username longer than 20 characters', () => {
        const result = validateUsername('abcdefghij12345678901');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username must be at most 20 characters');
        }
      });
    });

    describe('invalid usernames - format', () => {
      it('should reject username starting with hyphen', () => {
        const result = validateUsername('-john');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toContain('cannot start or end with a hyphen');
        }
      });

      it('should reject username ending with hyphen', () => {
        const result = validateUsername('john-');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toContain('cannot start or end with a hyphen');
        }
      });

      it('should reject username with consecutive hyphens', () => {
        const result = validateUsername('john--doe');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe(
            'Username cannot contain consecutive hyphens',
          );
        }
      });

      it('should reject username with special characters', () => {
        const result = validateUsername('john@doe');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toContain(
            'lowercase letters, numbers, and hyphens',
          );
        }
      });

      it('should reject username with spaces', () => {
        const result = validateUsername('john doe');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toContain(
            'lowercase letters, numbers, and hyphens',
          );
        }
      });

      it('should reject username with underscores', () => {
        const result = validateUsername('john_doe');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toContain(
            'lowercase letters, numbers, and hyphens',
          );
        }
      });
    });

    describe('invalid usernames - reserved', () => {
      const reservedNames = [
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

      it.each(
        reservedNames,
      )('should reject reserved username: %s', (username) => {
        const result = validateUsername(username);
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('This username is reserved');
        }
      });

      it('should reject reserved username with uppercase', () => {
        const result = validateUsername('ADMIN');
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('This username is reserved');
        }
      });
    });

    describe('edge cases', () => {
      it('should reject null input', () => {
        const result = validateUsername(null as unknown as string);
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username is required');
        }
      });

      it('should reject undefined input', () => {
        const result = validateUsername(undefined as unknown as string);
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username is required');
        }
      });

      it('should reject non-string input', () => {
        const result = validateUsername(123 as unknown as string);
        expect(result.valid).toBe(false);
        if (!result.valid) {
          expect(result.error).toBe('Username is required');
        }
      });
    });
  });

  describe('generateUsername', () => {
    it('should generate a username', () => {
      const username = generateUsername();
      expect(username).toBeDefined();
      expect(typeof username).toBe('string');
    });

    it('should generate username in correct format (adjective-noun-number)', () => {
      const username = generateUsername();
      const parts = username.split('-');
      expect(parts.length).toBe(3);
      expect(parts[0]).toMatch(/^[a-z]+$/); // adjective
      expect(parts[1]).toMatch(/^[a-z]+$/); // noun
      expect(parts[2]).toMatch(/^[0-9]+$/); // number
    });

    it('should generate different usernames on multiple calls', () => {
      const usernames = new Set<string>();
      for (let i = 0; i < 100; i++) {
        usernames.add(generateUsername());
      }
      // With random generation, we expect most to be unique
      expect(usernames.size).toBeGreaterThan(50);
    });

    it('should generate usernames that pass validation', () => {
      for (let i = 0; i < 20; i++) {
        const username = generateUsername();
        const result = validateUsername(username);
        expect(result.valid).toBe(true);
      }
    });
  });

  describe('generateUniqueUsername', () => {
    it('should return first generated username when not exists', async () => {
      const checkExists = vi.fn().mockResolvedValue(false);
      const username = await generateUniqueUsername(checkExists);

      expect(username).toBeDefined();
      expect(checkExists).toHaveBeenCalledTimes(1);
    });

    it('should retry when username exists', async () => {
      let callCount = 0;
      const checkExists = vi.fn().mockImplementation(async () => {
        callCount++;
        // First 3 calls return true (exists), then false
        return callCount < 4;
      });

      const username = await generateUniqueUsername(checkExists);

      expect(username).toBeDefined();
      expect(checkExists).toHaveBeenCalledTimes(4);
    });

    it('should use fallback after max attempts', async () => {
      const checkExists = vi.fn().mockResolvedValue(true);
      const username = await generateUniqueUsername(checkExists, 5);

      expect(username).toBeDefined();
      expect(username).toMatch(/^user-[a-z0-9]+$/);
      expect(checkExists).toHaveBeenCalledTimes(5);
    });

    it('should respect custom max attempts', async () => {
      const checkExists = vi.fn().mockResolvedValue(true);
      const username = await generateUniqueUsername(checkExists, 3);

      expect(checkExists).toHaveBeenCalledTimes(3);
      expect(username).toMatch(/^user-[a-z0-9]+$/);
    });

    it('should call checkExists with generated username', async () => {
      const checkExists = vi.fn().mockResolvedValue(false);
      await generateUniqueUsername(checkExists);

      const calledWith = checkExists.mock.calls[0][0];
      // Should be in format adjective-noun-number
      expect(calledWith).toMatch(/^[a-z]+-[a-z]+-[0-9]+$/);
    });
  });
});
