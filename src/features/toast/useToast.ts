import { useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';
import { ToastSeverity } from './toast-types';
import { show } from './toast-slice';

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (severity: ToastSeverity, message: string) => {
      dispatch(show({ severity, message }));
    },
    [dispatch],
  );

  return { showToast };
};
