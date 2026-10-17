import { describe, it, expect } from 'vitest';

import { addMultipleClassNames } from '../class-names';

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
