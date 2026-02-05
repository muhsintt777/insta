import { describe, it, expect } from 'vitest';
import { GetCurrentUserSchema } from '../schema';

describe('GetCurrentUserSchema', () => {
  const validUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  describe('valid data', () => {
    it('parses valid user data', () => {
      const result = GetCurrentUserSchema.safeParse(validUser);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validUser);
      }
    });

    it('allows null lastName', () => {
      const userWithNullLastName = { ...validUser, lastName: null };
      const result = GetCurrentUserSchema.safeParse(userWithNullLastName);

      expect(result.success).toBe(true);
    });

    it('trims whitespace from string fields', () => {
      const userWithWhitespace = {
        ...validUser,
        firstName: '  John  ',
        email: '  john.doe@example.com  ',
      };
      const result = GetCurrentUserSchema.safeParse(userWithWhitespace);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.firstName).toBe('John');
        expect(result.data.email).toBe('john.doe@example.com');
      }
    });
  });

  describe('id validation', () => {
    it('rejects non-integer id', () => {
      const result = GetCurrentUserSchema.safeParse({ ...validUser, id: 1.5 });

      expect(result.success).toBe(false);
    });

    it('rejects string id', () => {
      const result = GetCurrentUserSchema.safeParse({ ...validUser, id: '1' });

      expect(result.success).toBe(false);
    });
  });

  describe('firstName validation', () => {
    it('rejects missing firstName', () => {
      const { firstName, ...userWithoutFirstName } = validUser;
      const result = GetCurrentUserSchema.safeParse(userWithoutFirstName);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Firstname is required');
      }
    });

    it('rejects invalid firstName with numbers', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        firstName: 'John123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Firstname is not valid');
      }
    });

    it('accepts firstName with space', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        firstName: 'John Paul',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('lastName validation', () => {
    it('rejects invalid lastName with special characters', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        lastName: 'Doe@123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Lastname is not valid');
      }
    });
  });

  describe('email validation', () => {
    it('rejects missing email', () => {
      const { email, ...userWithoutEmail } = validUser;
      const result = GetCurrentUserSchema.safeParse(userWithoutEmail);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
      }
    });

    it('rejects invalid email format', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        email: 'invalid-email',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is not valid');
      }
    });

    it('accepts email with plus sign', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        email: 'john+test@example.com',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('datetime validation', () => {
    it('rejects invalid createdAt format', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        createdAt: '2024-01-01',
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid updatedAt format', () => {
      const result = GetCurrentUserSchema.safeParse({
        ...validUser,
        updatedAt: 'not-a-date',
      });

      expect(result.success).toBe(false);
    });
  });
});
