import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleErrorWithToast } from '../handle-error-with-toast';
import { store } from 'configs/store';
import { toastActions } from '../toast-slice';
import { CustomError } from 'utils/custom-error';
import { COMMON_ERROR_MESSAGE } from 'configs/constants';

vi.mock('configs/store', () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

describe('handleErrorWithToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('dispatches toast with CustomError message', () => {
    const customError = new CustomError('CUSTOM_TYPE', 'Custom error message');

    handleErrorWithToast(customError);

    expect(store.dispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'error', message: 'Custom error message' }),
    );
  });

  it('dispatches toast with Error message', () => {
    const error = new Error('Standard error message');

    handleErrorWithToast(error);

    expect(store.dispatch).toHaveBeenCalledWith(
      toastActions.show({
        severity: 'error',
        message: 'Standard error message',
      }),
    );
  });

  it('dispatches toast with error.message for generic object error', () => {
    const error = { message: 'Object error message' };

    handleErrorWithToast(error);

    expect(store.dispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'error', message: 'Object error message' }),
    );
  });

  it('dispatches toast with COMMON_ERROR_MESSAGE when no message available', () => {
    const error = {};

    handleErrorWithToast(error);

    expect(store.dispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'error', message: COMMON_ERROR_MESSAGE }),
    );
  });

  it('dispatches toast with string error', () => {
    handleErrorWithToast('String error');

    expect(store.dispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'error', message: COMMON_ERROR_MESSAGE }),
    );
  });
});
