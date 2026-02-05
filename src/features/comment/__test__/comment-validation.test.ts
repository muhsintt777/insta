import { describe, it, expect } from 'vitest';
import { commentFormSchema } from '../comment-validation';

describe('commentFormSchema', () => {
  describe('valid data', () => {
    it('parses valid comment', () => {
      const result = commentFormSchema.safeParse({
        comment: 'This is a comment',
      });

      expect(result.success).toBe(true);
    });

    it('accepts comment at minimum length', () => {
      const result = commentFormSchema.safeParse({ comment: 'A' });

      expect(result.success).toBe(true);
    });

    it('accepts comment at maximum length', () => {
      const comment = 'A'.repeat(100);
      const result = commentFormSchema.safeParse({ comment });

      expect(result.success).toBe(true);
    });
  });

  describe('invalid data', () => {
    it('rejects empty comment', () => {
      const result = commentFormSchema.safeParse({ comment: '' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Comment is too small');
      }
    });

    it('rejects comment longer than 100 characters', () => {
      const comment = 'A'.repeat(101);
      const result = commentFormSchema.safeParse({ comment });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Comment is too long');
      }
    });

    it('rejects missing comment field', () => {
      const result = commentFormSchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});
