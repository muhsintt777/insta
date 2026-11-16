import { describe, it, expect, vi, beforeEach } from 'vitest';
import { themeReducer, themeActions, getInitialTheme } from '../theme-slice';

// Mock localStorage and document
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

const documentMock = {
  documentElement: {
    setAttribute: vi.fn(),
  },
};
Object.defineProperty(global, 'document', {
  value: documentMock,
  writable: true,
});

describe('themeSlice', () => {
  const initialState = { theme: 'light' as const };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('toggleTheme', () => {
    it('toggles from light to dark', () => {
      const state = themeReducer(initialState, themeActions.toggleTheme());

      expect(state.theme).toBe('dark');
    });

    it('toggles from dark to light', () => {
      const darkState = { theme: 'dark' as const };
      const state = themeReducer(darkState, themeActions.toggleTheme());

      expect(state.theme).toBe('light');
    });

    it('saves theme to localStorage', () => {
      themeReducer(initialState, themeActions.toggleTheme());

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'app:theme',
        'dark',
      );
    });

    it('sets data-theme attribute on document', () => {
      themeReducer(initialState, themeActions.toggleTheme());

      expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark',
      );
    });
  });

  describe('initial state', () => {
    it('returns initial state for unknown action', () => {
      const state = themeReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
    });
  });
});

describe('getInitialTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns dark when localStorage has dark', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    const theme = getInitialTheme();

    expect(theme).toBe('dark');
  });

  it('returns light when localStorage has light', () => {
    localStorageMock.getItem.mockReturnValue('light');

    const theme = getInitialTheme();

    expect(theme).toBe('light');
  });

  it('returns light when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const theme = getInitialTheme();

    expect(theme).toBe('light');
  });

  it('returns light when localStorage throws error', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    const theme = getInitialTheme();

    expect(theme).toBe('light');
  });
});
