import { describe, it, expect } from 'vitest';
import { userEditSchema } from '../user-validation';

describe('userEditSchema', () => {
  describe('valid data', () => {
    it('parses valid user edit data', () => {
      const result = userEditSchema.safeParse({
        fullName: 'John Doe',
        bio: 'Hello, I am John',
      });

      expect(result.success).toBe(true);
    });

    it('trims whitespace from fields', () => {
      const result = userEditSchema.safeParse({
        fullName: '  John Doe  ',
        bio: '  My bio  ',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fullName).toBe('John Doe');
        expect(result.data.bio).toBe('My bio');
      }
    });

    it('accepts empty bio', () => {
      const result = userEditSchema.safeParse({
        fullName: 'John Doe',
        bio: '',
      });

      expect(result.success).toBe(true);
    });

    it('accepts name with space', () => {
      const result = userEditSchema.safeParse({
        fullName: 'John Paul Doe',
        bio: 'Bio',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('fullName validation', () => {
    it('rejects invalid fullName with numbers', () => {
      const result = userEditSchema.safeParse({
        fullName: 'John123',
        bio: 'Bio',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid fullname');
      }
    });

    it('rejects fullName longer than 100 characters', () => {
      const longName = 'John '.repeat(25);
      const result = userEditSchema.safeParse({
        fullName: longName,
        bio: 'Bio',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Fullname is too long');
      }
    });

    it('rejects fullName with special characters', () => {
      const result = userEditSchema.safeParse({
        fullName: 'John@Doe',
        bio: 'Bio',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('bio validation', () => {
    it('rejects bio longer than 200 characters', () => {
      const longBio = 'A'.repeat(201);
      const result = userEditSchema.safeParse({
        fullName: 'John Doe',
        bio: longBio,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Bio is too long');
      }
    });

    it('accepts bio at maximum length', () => {
      const maxBio = 'A'.repeat(200);
      const result = userEditSchema.safeParse({
        fullName: 'John Doe',
        bio: maxBio,
      });

      expect(result.success).toBe(true);
    });
  });
});
