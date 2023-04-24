import HttpStatus from "../enums/HttpStatus";
import CustomError from "./CustomError";

class DuplicationError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export default DuplicationError;
