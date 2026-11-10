import { useDispatch, useSelector } from 'react-redux';
import { ToastNotification } from '@insta/ui/toasts';
import type { ToastState } from './toast-types';
import { toastActions } from './toast-slice';

export const ToastHost = () => {
  const dispatch = useDispatch();
  const { message, show, severity } = useSelector(
    (state: { toast: ToastState }) => state.toast,
  );

  return (
    <ToastNotification
      open={show}
      message={message}
      severity={severity}
      onClose={() => dispatch(toastActions.hideToast())}
    />
  );
};

//todo: add a proper handle toasts mechanism globally
