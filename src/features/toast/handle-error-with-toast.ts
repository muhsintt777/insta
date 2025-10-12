import { store } from 'configs/store';
import { CustomError } from 'utils/custom-error';
import { toastActions } from './toast-slice';

export const handleErrorWithToast = (error: any) => {
  const dispatch = store.dispatch;
  if (error instanceof CustomError) {
    dispatch(toastActions.show({ severity: 'error', message: error.message }));
  } else if (error instanceof Error) {
    dispatch(toastActions.show({ severity: 'error', message: error.message }));
  } else {
    dispatch(
      toastActions.show({
        severity: 'error',
        message:
          error.message || 'Something went wrong, please try again later.',
      }),
    );
  }
};
