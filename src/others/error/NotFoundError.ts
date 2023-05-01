import HttpStatus from "../enums/HttpStatus";
import CustomError from "./CustomError";

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
