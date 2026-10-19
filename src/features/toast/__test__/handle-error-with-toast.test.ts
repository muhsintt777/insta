import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleErrorWithToast } from '../handle-error-with-toast';
import { CustomError } from 'shared/lib/errors/custom-error';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';

describe('handleErrorWithToast', () => {
  const showToast = vi.fn();

  beforeEach(() => {
    showToast.mockClear();
  });

  it('dispatches toast with CustomError message', () => {
    const customError = new CustomError('CUSTOM_TYPE', 'Custom error message');

    handleErrorWithToast(customError, showToast);

    expect(showToast).toHaveBeenCalledWith('error', 'Custom error message');
  });

  it('dispatches toast with Error message', () => {
    const error = new Error('Standard error message');

    handleErrorWithToast(error, showToast);

    expect(showToast).toHaveBeenCalledWith('error', 'Standard error message');
  });

  it('dispatches toast with error.message for generic object error', () => {
    const error = { message: 'Object error message' };

    handleErrorWithToast(error, showToast);

    expect(showToast).toHaveBeenCalledWith('error', 'Object error message');
  });

  it('dispatches toast with COMMON_ERROR_MESSAGE when no message available', () => {
    const error = {};

    handleErrorWithToast(error, showToast);

    expect(showToast).toHaveBeenCalledWith('error', COMMON_ERROR_MESSAGE);
  });

  it('dispatches toast with string error', () => {
    handleErrorWithToast('String error', showToast);

    expect(showToast).toHaveBeenCalledWith('error', COMMON_ERROR_MESSAGE);
  });
});
