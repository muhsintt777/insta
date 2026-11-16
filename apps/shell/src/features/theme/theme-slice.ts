import { createSlice } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from './theme-types';

const STORAGE_KEY = 'app:theme';

const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      state.theme = newTheme;
    },
  },
});

export const themeActions = themeSlice.actions;
export const selectTheme = (state: { theme: ThemeState }) => state.theme.theme;
export const themeReducer = themeSlice.reducer;

export const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' ? 'dark' : 'light';
  } catch {
    //
  }
  return 'light';
};
