import { CustomError } from 'shared/lib/errors/custom-error';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';
import { ToastSeverity } from './toast-types';

export const handleErrorWithToast = (
  error: unknown,
  showToast: (severity: ToastSeverity, message: string) => void,
) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message || COMMON_ERROR_MESSAGE)
      : COMMON_ERROR_MESSAGE;

  showToast('error', message);
};
