import { Request } from "express";
import { Schema } from "joi";
import * as Joi from "joi";
import ValidationError from "../others/error/ValidationError";
import DebtMemberRole from "../others/enums/DebtMemberRole";

class DebtMemberValidation {
  public validateAddNewDebtMemberRequestParams = async (req: Request): Promise<void> => {
    const schema: Schema = Joi.object({
      groupId: Joi.number(),
      debtId: Joi.number(),
    });
    try {
      await schema.validateAsync(req.params);
    } catch (error) {
      throw new ValidationError(`${error.message} (request params)`);
    }
  };

  public validateAddNewDebtMemberRequestBody = async (req: Request): Promise<void> => {
    const roles = Object.values(DebtMemberRole);
    const schema: Schema = Joi.object({
      role: Joi.string().valid(...roles),
      groupMemberId: Joi.string().required(),
      description: Joi.string(),
    });
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      throw new ValidationError(`${error.message} (request body)`);
    }
  };
}

export default DebtMemberValidation;
