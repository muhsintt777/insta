import { useCallback } from 'react';
import { MFE_EVENT_NAMES } from './contracts';
import type { ToastSeverity } from './contracts';
import { publishEvent } from './event-bus';

const COMMON_ERROR_MESSAGE = 'Something went wrong, Please try again later.';

export const showToast = (severity: ToastSeverity, message: string) => {
  publishEvent(MFE_EVENT_NAMES.toast, { severity, message });
};

export const useToast = () => {
  const show = useCallback(showToast, []);
  return { showToast: show };
};

export const handleErrorWithToast = (
  error: unknown,
  notify: typeof showToast = showToast,
) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message || COMMON_ERROR_MESSAGE)
      : COMMON_ERROR_MESSAGE;

  notify('error', message);
};
