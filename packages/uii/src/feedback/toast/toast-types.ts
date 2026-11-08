export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface ToastState {
  show: boolean;
  severity: ToastSeverity;
  message: string;
}

export interface ShowToastPayload {
  severity: ToastSeverity;
  message: string;
}
