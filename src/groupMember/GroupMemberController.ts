import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import GroupMemberService from "./GroupMemberService";
import GroupMemberValidation from "./GroupMemberValidation";
import GroupService from "../group/GroupService";
import GroupMember from "./GroupMember";

const groupMemberService = new GroupMemberService();
const groupMemberValidation = new GroupMemberValidation();
const groupService = new GroupService();

class GroupMemberController {
  public addNewGroupMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { name } = req.body;
      await groupMemberValidation.validateGroupMembersRequestParams(req);
      await groupMemberValidation.validateAddNewGroupMemberRequestBody(req);
      await groupService.checkGroupNotExistedById(Number(groupId));
      await groupMemberService.checkGroupMemberIsCreated(Number(groupId), name);
      const newGroupMember: GroupMember = await groupMemberService.addNewGroupMember(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new group's member successful", newGroupMember });
    } catch (error) {
      next(error);
    }
  };

  public getGroupMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.body;
      await groupMemberValidation.validateGroupMembersRequestParams(req);
      const groupMembers = await groupMemberService.getGroupMembersById(Number(groupId));
      res.status(HttpStatus.OK).json({ message: "Get group's members successful", groupMembers });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupMemberController;
