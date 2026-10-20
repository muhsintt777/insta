import { createSlice } from '@reduxjs/toolkit';
import type { LoaderState } from './types';

const initialState: LoaderState = {
  showBackdrop: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showBackdrop: (state) => {
      state.showBackdrop = true;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export const selectLoader = (state: { loader: LoaderState }) => state.loader;
export const loaderReducer = loaderSlice.reducer;
