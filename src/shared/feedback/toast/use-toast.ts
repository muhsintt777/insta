import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { ToastSeverity } from './toast-types';
import { toastActions } from './toast-slice';

export const useToast = () => {
  const dispatch = useDispatch();

  const showToast = useCallback(
    (severity: ToastSeverity, message: string) => {
      dispatch(toastActions.showToast({ severity, message }));
    },
    [dispatch],
  );

  return { showToast };
};
