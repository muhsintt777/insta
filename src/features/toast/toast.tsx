import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { selectToast, toastActions } from './toast-slice';

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, show, severity } = useAppSelector(selectToast);

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
