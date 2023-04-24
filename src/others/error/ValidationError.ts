import HttpStatus from "../enums/HttpStatus";
import CustomError from "./CustomError";

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export default ValidationError;
