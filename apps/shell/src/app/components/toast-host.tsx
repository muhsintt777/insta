import { useEffect, useState } from 'react';
import { ToastNotification } from '@insta/ui/toasts';
import { EventBus, MFE_EVENT_NAMES } from '@insta/events';
import type { ToastSeverity } from '@insta/ui/toasts';
import type { ToastEventDetail } from '@insta/events';

export const ToastHost = () => {
  const [toast, setToast] = useState<
    (ToastEventDetail & { severity: ToastSeverity }) | null
  >(null);

  useEffect(() => {
    const unsubscribe = [
      EventBus.on(MFE_EVENT_NAMES.toast.success, (detail) =>
        setToast({ ...detail, severity: 'success' }),
      ),
      EventBus.on(MFE_EVENT_NAMES.toast.error, (detail) =>
        setToast({ ...detail, severity: 'error' }),
      ),
      EventBus.on(MFE_EVENT_NAMES.toast.info, (detail) =>
        setToast({ ...detail, severity: 'info' }),
      ),
      EventBus.on(MFE_EVENT_NAMES.toast.warning, (detail) =>
        setToast({ ...detail, severity: 'warning' }),
      ),
    ];

    return () => unsubscribe.forEach((removeListener) => removeListener());
  }, []);

  return (
    <ToastNotification
      open={toast !== null}
      message={toast?.message ?? ''}
      severity={toast?.severity ?? 'info'}
      onClose={() => setToast(null)}
    />
  );
};
