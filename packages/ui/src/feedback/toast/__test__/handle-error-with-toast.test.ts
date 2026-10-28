import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleErrorWithToast } from '../handle-error-with-toast';
import { CustomError } from '@insta/core/lib/errors/custom-error';
import { COMMON_ERROR_MESSAGE } from '@insta/core/constants';

describe('handleErrorWithToast', () => {
  const showToast = vi.fn();

  beforeEach(() => {
    showToast.mockClear();
  });

  it('uses a CustomError message', () => {
    handleErrorWithToast(
      new CustomError('CUSTOM_TYPE', 'Custom error message'),
      showToast,
    );
    expect(showToast).toHaveBeenCalledWith('error', 'Custom error message');
  });

  it('uses an Error message', () => {
    handleErrorWithToast(new Error('Standard error message'), showToast);
    expect(showToast).toHaveBeenCalledWith('error', 'Standard error message');
  });

  it('uses a generic object message', () => {
    handleErrorWithToast({ message: 'Object error message' }, showToast);
    expect(showToast).toHaveBeenCalledWith('error', 'Object error message');
  });

  it('uses the common message when the error has no message', () => {
    handleErrorWithToast({}, showToast);
    expect(showToast).toHaveBeenCalledWith('error', COMMON_ERROR_MESSAGE);
  });

  it('uses the common message for string errors', () => {
    handleErrorWithToast('String error', showToast);
    expect(showToast).toHaveBeenCalledWith('error', COMMON_ERROR_MESSAGE);
  });
});
