import HttpStatus from "../enums/HttpStatus";
import CustomError from "./CustomError";

class DuplicationError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
    Object.setPrototypeOf(this, DuplicationError.prototype);
  }
}

export default DuplicationError;
