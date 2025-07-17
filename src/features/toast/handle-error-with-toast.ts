import { store } from 'configs/store';
import { CustomError } from 'utils/custom-error';
import { show } from './toast-slice';

export const handleErrorWithToast = (error: any) => {
  const dispatch = store.dispatch;
  if (error instanceof CustomError) {
    dispatch(show({ severity: 'error', message: error.message }));
  } else if (error instanceof Error) {
    dispatch(show({ severity: 'error', message: error.message }));
  } else {
    dispatch(
      show({
        severity: 'error',
        message:
          error.message || 'Something went wrong, please try again later.',
      }),
    );
  }
};
