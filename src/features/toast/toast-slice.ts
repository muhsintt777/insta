import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ShowToastPayload, ToastState } from './toast-types';

const initialState: ToastState = {
  show: false,
  severity: 'info',
  message: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      state.show = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const toastActions = toastSlice.actions;

export const selectToast = (state: { toast: ToastState }) => state.toast;
export const toastReducer = toastSlice.reducer;
