import { describe, it, expect } from 'vitest';
import { trimAllWhitespace } from '../string-utils';

describe('trimAllWhitespace', () => {
  it('removes all whitespace characters', () => {
    expect(trimAllWhitespace(' a b\tc\nd ')).toBe('abcd');
  });

  it('returns an empty string for whitespace-only input', () => {
    expect(trimAllWhitespace('   ')).toBe('');
  });
});
