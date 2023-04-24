import { NextFunction, Request, Response } from "express";
import CustomError from "../error/CustomError";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
	console.error(error);
	if (error instanceof CustomError) {
		res.status(error.getHttpStatus()).json({ message: error.getMessage() });
	} else {
		res.status(500).send({ message: error.message });
	}
	next();
};

export default errorHandler;
