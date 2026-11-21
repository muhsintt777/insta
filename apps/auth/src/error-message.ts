const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message || DEFAULT_ERROR_MESSAGE);
  }
  return DEFAULT_ERROR_MESSAGE;
};
