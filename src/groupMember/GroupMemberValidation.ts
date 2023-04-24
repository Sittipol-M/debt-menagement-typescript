import { Request } from "express";
import * as Joi from "joi";
import { Schema } from "joi";
import ValidationError from "../others/error/ValidationError";
import GroupMemberRole from "../others/enums/GroupMemberRole";

class GroupMemberValidation {
  public validateGroupMembersRequestParams = async (req: Request): Promise<void> => {
    const schema: Schema = Joi.object({
      groupId: Joi.number(),
    });
    try {
      await schema.validateAsync(req.params);
    } catch (error) {
      throw new ValidationError(`${error.message} (request params)`);
    }
  };

  public validateAddNewGroupMemberRequestBody = async (req: Request): Promise<void> => {
    const groupMemberRoles = Object.values(GroupMemberRole);
    const schema: Schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      role: Joi.string()
        .valid(...groupMemberRoles)
        .required(),
    });
    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      throw new ValidationError(`${error.message} (request body)`);
    }
  };
}

export default GroupMemberValidation;
