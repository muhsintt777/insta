// import { ERROR_TYPE } from 'configs/constants';
// type ErrorType = typeof ERROR_TYPE;
// type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export class CustomError {
  message: string;
  errorType: string;

  constructor(errorType: string, message: string) {
    this.errorType = errorType;
    this.message = message;
  }
}
