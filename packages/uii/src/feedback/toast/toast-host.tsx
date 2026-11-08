import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { ToastState } from './toast-types';
import { toastActions } from './toast-slice';

export const ToastHost = () => {
  const dispatch = useDispatch();
  const { message, show, severity } = useSelector(
    (state: { toast: ToastState }) => state.toast,
  );

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={() => dispatch(toastActions.hideToast())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} variant="standard" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
