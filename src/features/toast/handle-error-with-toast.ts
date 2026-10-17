import { store } from 'main/store';
import { CustomError } from 'shared/lib/errors/custom-error';
import { toastActions } from './toast-slice';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';

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
        message: error.message || COMMON_ERROR_MESSAGE,
      }),
    );
  }
};
