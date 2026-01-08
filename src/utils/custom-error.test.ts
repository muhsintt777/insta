import { describe, it, expect } from 'vitest';
import { CustomError } from './custom-error';

describe('CustomError', () => {
  it('creates error with errorType and message', () => {
    const error = new CustomError('AUTH_ERROR', 'Invalid credentials');

    expect(error.errorType).toBe('AUTH_ERROR');
    expect(error.message).toBe('Invalid credentials');
  });

  it('stores different error types correctly', () => {
    const validationError = new CustomError(
      'VALIDATION_FAILED',
      'Field is required',
    );
    const serverError = new CustomError(
      'INTERNAL_SERVER_ERROR',
      'Server error',
    );

    expect(validationError.errorType).toBe('VALIDATION_FAILED');
    expect(validationError.message).toBe('Field is required');

    expect(serverError.errorType).toBe('INTERNAL_SERVER_ERROR');
    expect(serverError.message).toBe('Server error');
  });

  it('allows empty message', () => {
    const error = new CustomError('UNKNOWN_ERROR', '');

    expect(error.errorType).toBe('UNKNOWN_ERROR');
    expect(error.message).toBe('');
  });

  it('is an instance of CustomError', () => {
    const error = new CustomError('TEST_ERROR', 'Test message');

    expect(error).toBeInstanceOf(CustomError);
  });
});
