import { describe, it, expect } from 'vitest';
import { postFormSchema, editPostFormSchema } from './post-validation';

describe('postFormSchema', () => {
  describe('valid data', () => {
    it('parses valid post data', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = postFormSchema.safeParse({
        caption: 'My caption',
        image: file,
      });

      expect(result.success).toBe(true);
    });

    it('accepts caption at minimum length', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = postFormSchema.safeParse({
        caption: 'Hi',
        image: file,
      });

      expect(result.success).toBe(true);
    });

    it('accepts caption at maximum length', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const caption = 'A'.repeat(200);
      const result = postFormSchema.safeParse({
        caption,
        image: file,
      });

      expect(result.success).toBe(true);
    });
  });

  describe('caption validation', () => {
    it('rejects caption shorter than 2 characters', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = postFormSchema.safeParse({
        caption: 'A',
        image: file,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Caption is too small');
      }
    });

    it('rejects caption longer than 200 characters', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const caption = 'A'.repeat(201);
      const result = postFormSchema.safeParse({
        caption,
        image: file,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Caption is too long');
      }
    });
  });

  describe('image validation', () => {
    it('rejects non-File type', () => {
      const result = postFormSchema.safeParse({
        caption: 'My caption',
        image: 'not-a-file',
      });

      expect(result.success).toBe(false);
    });

    it('rejects image larger than 2MB', () => {
      const largeContent = 'x'.repeat(3 * 1024 * 1024);
      const largeFile = new File([largeContent], 'large.jpg', {
        type: 'image/jpeg',
      });
      const result = postFormSchema.safeParse({
        caption: 'My caption',
        image: largeFile,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Image must be less than 2MB and of image type',
        );
      }
    });

    it('rejects non-image file type', () => {
      const textFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      const result = postFormSchema.safeParse({
        caption: 'My caption',
        image: textFile,
      });

      expect(result.success).toBe(false);
    });
  });
});

describe('editPostFormSchema', () => {
  describe('valid data', () => {
    it('parses valid edit data', () => {
      const result = editPostFormSchema.safeParse({
        caption: 'Updated caption',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('caption validation', () => {
    it('rejects caption shorter than 2 characters', () => {
      const result = editPostFormSchema.safeParse({
        caption: 'A',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Caption is too small');
      }
    });

    it('rejects caption longer than 200 characters', () => {
      const caption = 'A'.repeat(201);
      const result = editPostFormSchema.safeParse({
        caption,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Caption is too long');
      }
    });
  });
});
