export const MFE_EVENT_NAMES = {
  toast: {
    success: 'toast:success',
    error: 'toast:error',
    info: 'toast:info',
    warning: 'toast:warning',
  },
} as const;

export interface ToastEventDetail {
  message: string;
}

export interface MfeEventContracts {
  [MFE_EVENT_NAMES.toast.success]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.error]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.info]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.warning]: ToastEventDetail;
}

export type MfeEventName = keyof MfeEventContracts;
