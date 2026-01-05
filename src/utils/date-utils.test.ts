import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DateUtils } from './date-utils';

describe('DateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // set a fixed "now" for deterministic relative formatting
    vi.setSystemTime(new Date('2026-01-05T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formatRelative returns "just now" for <1 minute', () => {
    const d = new Date('2026-01-05T11:59:45Z'); // 15s ago
    expect(DateUtils.formatRelative(d)).toBe('just now');
  });

  it('formatRelative returns minutes ago', () => {
    const d = new Date('2026-01-05T11:55:00Z'); // 5 minutes ago
    expect(DateUtils.formatRelative(d)).toBe('5 min ago');
  });

  it('formatRelative returns hours ago with singular/plural', () => {
    const oneHour = new Date('2026-01-05T11:00:00Z');
    expect(DateUtils.formatRelative(oneHour)).toBe('1 hour ago');

    const twoHours = new Date('2026-01-05T10:00:00Z');
    expect(DateUtils.formatRelative(twoHours)).toBe('2 hours ago');
  });

  it('formatRelative falls back to formatted date for >24 hours', () => {
    const older = new Date('2026-01-03T12:00:00Z'); // 2 days ago
    expect(DateUtils.formatRelative(older)).toBe('03 Jan 2026');
  });

  it('toIsoString returns ISO formatted string', () => {
    const d = new Date('2020-01-01T00:00:00Z');
    expect(DateUtils.toIsoString(d)).toBe(d.toISOString());
  });

  it('dateFromIsoString parses ISO string to Date', () => {
    const iso = '2021-06-15T08:30:00.000Z';
    const d = DateUtils.dateFromIsoString(iso);
    expect(d.toISOString()).toBe(iso);
  });

  it('formatDate supports default and dd-mm-yyyy formats', () => {
    const d = new Date('2023-04-09T00:00:00Z');
    // default: dd mmm yyyy -> day padded + short month + year
    expect(DateUtils.formatDate(d)).toBe('09 Apr 2023');
    expect(DateUtils.formatDate(d, 'dd-mm-yyyy')).toBe('09-04-2023');
  });
});
