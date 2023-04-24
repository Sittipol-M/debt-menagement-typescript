class CustomError extends Error {
  private httpStatus: number = 500;
  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public getMessage = (): string => {
    return this.message;
  };

  public getHttpStatus = (): number => {
    return this.httpStatus;
  };

  public setMessage = (message: string): void => {
    this.message = message;
  };

  public setHttpStatus = (httpStatus: number): void => {
    this.httpStatus = httpStatus;
  };
}

export default CustomError;
