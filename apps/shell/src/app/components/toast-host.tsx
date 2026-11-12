import { useEffect, useState } from 'react';
import { ToastNotification } from '@insta/ui/toasts';
import { MFE_EVENT_NAMES, subscribeToEvent } from '@insta/events';
import type { ToastEventDetail } from '@insta/events';

export const ToastHost = () => {
  const [toast, setToast] = useState<ToastEventDetail | null>(null);

  useEffect(
    () => subscribeToEvent(MFE_EVENT_NAMES.toast, (detail) => setToast(detail)),
    [],
  );

  return (
    <ToastNotification
      open={toast !== null}
      message={toast?.message ?? ''}
      severity={toast?.severity ?? 'info'}
      onClose={() => setToast(null)}
    />
  );
};
