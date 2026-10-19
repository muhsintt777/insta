import { useCallback } from 'react';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import type { ToastSeverity } from './toast-types';
import { toastActions } from './toast-slice';

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (severity: ToastSeverity, message: string) => {
      dispatch(toastActions.showToast({ severity, message }));
    },
    [dispatch],
  );

  return { showToast };
};
