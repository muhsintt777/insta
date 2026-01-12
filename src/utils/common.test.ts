import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock dependencies that `common.ts` imports so the module can be loaded in isolation
vi.mock('configs/constants', () => ({ ERROR_TYPE: {} }));
vi.mock('axios', () => ({ AxiosError: class AxiosError extends Error {} }));
vi.mock('./custom-error', () => ({
  CustomError: class CustomError extends Error {},
}));

let addMultipleClassNames: (...c: string[]) => string;
beforeAll(async () => {
  const mod = await import('./common');
  addMultipleClassNames = mod.addMultipleClassNames;
});

describe('addMultipleClassNames', () => {
  it('joins multiple class names with a single space', () => {
    const result = addMultipleClassNames('one', 'two', 'three');
    expect(result).toBe('one two three');
  });

  it('returns a single class name when only one provided', () => {
    const result = addMultipleClassNames('single');
    expect(result).toBe('single');
  });

  it('returns an empty string when no arguments are passed', () => {
    const result = addMultipleClassNames();
    expect(result).toBe('');
  });

  it('preserves empty strings and duplicates (joins as-is)', () => {
    const result = addMultipleClassNames('a', '', 'b', 'b');
    expect(result).toBe('a  b b');
  });
});
