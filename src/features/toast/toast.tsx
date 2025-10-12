import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { selectToastConfigs, toastActions } from './toast-slice';

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, show, severity } = useAppSelector(selectToastConfigs);

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={() => dispatch(toastActions.hide())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} variant="standard" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
