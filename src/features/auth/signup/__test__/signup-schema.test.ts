import { describe, it, expect } from 'vitest';
import { signupFormSchema } from '../signup-schema';

describe('signupFormSchema', () => {
  const validData = {
    fullName: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    profileImage: null,
  };

  describe('valid data', () => {
    it('parses valid signup data', () => {
      const result = signupFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('trims whitespace from fields', () => {
      const dataWithWhitespace = {
        ...validData,
        fullName: '  John Doe  ',
        email: '  john@example.com  ',
      };
      const result = signupFormSchema.safeParse(dataWithWhitespace);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fullName).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
      }
    });

    it('normalizes multiple spaces in fullName', () => {
      const dataWithSpaces = { ...validData, fullName: 'John    Doe' };
      const result = signupFormSchema.safeParse(dataWithSpaces);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fullName).toBe('John Doe');
      }
    });
  });

  describe('fullName validation', () => {
    it('rejects fullName shorter than 3 characters', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        fullName: 'Jo',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Full name must be at least 3 characters',
        );
      }
    });

    it('rejects fullName longer than 50 characters', () => {
      const longName = 'A'.repeat(51);
      const result = signupFormSchema.safeParse({
        ...validData,
        fullName: longName,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Full name must not exceed 50 characters',
        );
      }
    });
  });

  describe('username validation', () => {
    it('rejects username shorter than 3 characters', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        username: 'ab',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Username must be at least 3 characters',
        );
      }
    });

    it('rejects username with spaces', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        username: 'john doe',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Username must not contain spaces',
        );
      }
    });

    it('rejects username longer than 50 characters', () => {
      const longUsername = 'a'.repeat(51);
      const result = signupFormSchema.safeParse({
        ...validData,
        username: longUsername,
      });

      expect(result.success).toBe(false);
    });
  });

  describe('email validation', () => {
    it('rejects invalid email format', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });
  });

  describe('password validation', () => {
    it('rejects password shorter than 6 characters', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        password: '12345',
        confirmPassword: '12345',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 6 characters',
        );
      }
    });

    it('rejects password with spaces', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        password: 'pass word123',
        confirmPassword: 'pass word123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must not contain spaces',
        );
      }
    });

    it('rejects password longer than 100 characters', () => {
      const longPassword = 'a'.repeat(101);
      const result = signupFormSchema.safeParse({
        ...validData,
        password: longPassword,
        confirmPassword: longPassword,
      });

      expect(result.success).toBe(false);
    });
  });

  describe('confirmPassword validation', () => {
    it('rejects when passwords do not match', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        password: 'password123',
        confirmPassword: 'different123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const confirmPasswordError = result.error.issues.find((issue) =>
          issue.path.includes('confirmPassword'),
        );
        expect(confirmPasswordError?.message).toBe('Passwords do not match');
      }
    });
  });

  describe('profileImage validation', () => {
    it('accepts null profileImage', () => {
      const result = signupFormSchema.safeParse({
        ...validData,
        profileImage: null,
      });

      expect(result.success).toBe(true);
    });

    it('rejects file larger than 5MB', () => {
      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });
      const result = signupFormSchema.safeParse({
        ...validData,
        profileImage: largeFile,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Profile image size must be less than 5MB',
        );
      }
    });

    it('accepts file smaller than 5MB', () => {
      const smallFile = new File(['test'], 'small.jpg', { type: 'image/jpeg' });
      const result = signupFormSchema.safeParse({
        ...validData,
        profileImage: smallFile,
      });

      expect(result.success).toBe(true);
    });
  });
});
