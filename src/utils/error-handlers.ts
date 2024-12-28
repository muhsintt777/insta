import { CustomError } from './custom-error';
import { ToastSeverity } from 'features/toast/toast-types';

export const toastErrorHandler = (
  error: any,
  showToast: (severity: ToastSeverity, message: string) => void,
) => {
  if (error instanceof CustomError) {
    showToast('error', error.message);
  } else if (error instanceof Error) {
    showToast('error', error.message);
  } else {
    showToast('error', 'Something went wrong');
  }
};
