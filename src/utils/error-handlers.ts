import { AxiosError } from 'axios';
import { ERROR_TYPE } from 'configs/constants';
import { CustomError } from './custom-error';
import { ToastSeverity } from 'features/toast/toast-types';

export const apiErrorHandler = (error: any) => {
  if (error instanceof AxiosError) {
    throw new CustomError(
      error.response?.data.errorType,
      error.response?.data.errorMessage,
    );
  } else if (error instanceof Error) {
    throw new CustomError(ERROR_TYPE.NODE_ERROR, error.message);
  } else if (error instanceof CustomError) {
    throw error;
  } else {
    throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Unknown error');
  }
};

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
