import { useEffect, useState } from 'react';
import { ToastNotification } from '@insta/ui/toasts';
import { MFE_EVENT_NAMES, type ToastEventDetail } from '@insta/contracts';
import { EventBus } from '../../event-bus';
import type { ToastSeverity } from '@insta/ui/toasts';

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
