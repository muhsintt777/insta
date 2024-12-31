import { AxiosError } from 'axios';
import { ERROR_TYPE } from 'configs/constants';
import { CustomError } from './custom-error';

export const trimAllWhitespace = (text: string): string => {
  return text.replace(/\s+/g, '');
};

export const asyncHandler = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else if (error instanceof AxiosError) {
      throw new CustomError(
        error.response?.data.errorType,
        error.response?.data.errorMessage,
      );
    } else if (error instanceof Error) {
      throw new CustomError(ERROR_TYPE.NODE_ERROR, error.message);
    } else {
      throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Unknown error');
    }
  }
};

export const addMultipleClassNames = (...classNames: string[]) => {
  return classNames.join(' ');
};
