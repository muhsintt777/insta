export class CustomError {
  message: string;
  errorType: string;

  constructor(errorType: string, message: string) {
    this.errorType = errorType;
    this.message = message;
  }
}
