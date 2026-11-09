import type { ToastSeverity } from '@insta/ui/toasts';

export type { ToastSeverity } from '@insta/ui/toasts';

export interface ToastState {
  show: boolean;
  severity: ToastSeverity;
  message: string;
}

export interface ShowToastPayload {
  severity: ToastSeverity;
  message: string;
}
