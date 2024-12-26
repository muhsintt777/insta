// import { ERROR_TYPE } from 'configs/constants';
// type ErrorType = typeof ERROR_TYPE;
// type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export class CustomError extends Error {
  message: string;
  errorType: string;

  constructor(errorType: string, message: string) {
    super(message);
    this.errorType = errorType;
    this.message = message;
  }
}
