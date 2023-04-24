import HttpStatus from "../enums/HttpStatus";
import CustomError from "./CustomError";

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export default NotFoundError;
