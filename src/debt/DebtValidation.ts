import { Request } from "express";
import { Schema } from "joi";
import Joi from "joi";
import ValidationError from "../others/error/ValidationError";

class DebtValidation {
  public validateAddNewDebtRequestParams = async (req: Request): Promise<void> => {
    const schema: Schema = Joi.object({
      groupId: Joi.number(),
    });
    try {
      await schema.validateAsync(req.params);
    } catch (error) {
      throw new ValidationError(`${error.message} (request params)`);
    }
  };

  public validateAddNewDebtRequestBody = async (req: Request): Promise<void> => {
    const schema: Schema = Joi.object({
      amount: Joi.number().required(),
      name: Joi.string().required(),
    });
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      throw new ValidationError(`${error.message} (request body)`);
    }
  };
}

export default DebtValidation;
