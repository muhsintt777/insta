import { COMMON_ERROR_MESSAGE } from '@insta/http';
import { EventBus, MFE_EVENT_NAMES } from '@insta/events';

export const emitErrorToast = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message || COMMON_ERROR_MESSAGE)
      : COMMON_ERROR_MESSAGE;

  EventBus.emit(MFE_EVENT_NAMES.toast.error, { message });
};
