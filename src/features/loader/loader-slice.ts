import { createSlice } from '@reduxjs/toolkit';
import { Rootstate } from 'configs/store';

interface LoaderState {
  showBackdrop: boolean;
}

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

export const { showBackdrop, hideBackdrop } = loaderSlice.actions;

export const selectLoader = (state: Rootstate) => state.loader;
export const loaderReducer = loaderSlice.reducer;
