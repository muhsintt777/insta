import { describe, it, expect } from 'vitest';
import { commentFormSchema } from '../comment-validation';

describe('commentFormSchema', () => {
  it('accepts a valid comment', () => {
    expect(
      commentFormSchema.safeParse({ comment: 'This is a comment' }).success,
    ).toBe(true);
  });

  it('accepts the minimum comment length', () => {
    expect(commentFormSchema.safeParse({ comment: 'A' }).success).toBe(true);
  });

  it('accepts the maximum comment length', () => {
    expect(
      commentFormSchema.safeParse({ comment: 'A'.repeat(100) }).success,
    ).toBe(true);
  });

  it('rejects an empty comment with a validation message', () => {
    const result = commentFormSchema.safeParse({ comment: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Comment is too small');
    }
  });

  it('rejects comments over the maximum length with a validation message', () => {
    const result = commentFormSchema.safeParse({ comment: 'A'.repeat(101) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Comment is too long');
    }
  });

  it('rejects a missing comment', () => {
    expect(commentFormSchema.safeParse({}).success).toBe(false);
  });
});
