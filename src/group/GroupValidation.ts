import { Request } from "express";
import * as Joi from "joi";
import { Schema } from "joi";
import ValidationError from "../others/error/ValidationError";

class GroupValidation {
  public validateAddNewGroupRequestBody = async (req: Request): Promise<void> => {
    const schema: Schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
    });
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      throw new ValidationError(`${error.message} (request body)`);
    }
  };
}

export default GroupValidation;
