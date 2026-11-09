import { Alert, Snackbar } from '@mui/material';

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface ToastNotificationProps {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  onClose: () => void;
}

export const ToastNotification = ({
  open,
  message,
  severity,
  onClose,
}: ToastNotificationProps) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <Alert severity={severity} variant="standard" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);