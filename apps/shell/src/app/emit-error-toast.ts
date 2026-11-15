import { COMMON_ERROR_MESSAGE } from '@insta/http';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from '@insta/utils';

export const emitErrorToast = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message || COMMON_ERROR_MESSAGE)
      : COMMON_ERROR_MESSAGE;

  EventBus.emit(MFE_EVENT_NAMES.toast.error, { message });
};
