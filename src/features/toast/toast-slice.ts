import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rootstate } from 'configs/store';
import { ToastSeverity } from './toast-types';

interface Toast {
  show: boolean;
  severity: ToastSeverity;
  message: string;
}

interface ShowToastPayload {
  severity: ToastSeverity;
  message: string;
}

const initialState: Toast = {
  show: false,
  severity: 'info',
  message: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<ShowToastPayload>) => {
      state.show = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

export const { show, hide } = toastSlice.actions;

export const selectToastConfigs = (state: Rootstate) => state.toast;
export const toastReducer = toastSlice.reducer;
