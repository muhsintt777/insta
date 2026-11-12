export const MFE_EVENT_NAMES = {
  toast: 'insta:toast',
} as const;

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface ToastEventDetail {
  severity: ToastSeverity;
  message: string;
}

export interface MfeEventContracts {
  [MFE_EVENT_NAMES.toast]: ToastEventDetail;
}

export type MfeEventName = keyof MfeEventContracts;
