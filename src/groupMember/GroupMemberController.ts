import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import GroupMemberService from "./GroupMemberService";
import GroupMemberValidation from "./GroupMemberValidation";
import GroupService from "../group/GroupService";
import GroupMember from "./GroupMember";

class GroupMemberController {
  private readonly groupMemberService: GroupMemberService;
  private readonly groupMemberValidation: GroupMemberValidation;
  private readonly groupService: GroupService;

  public constructor(
    groupMemberService: GroupMemberService,
    groupMemberValidation: GroupMemberValidation,
    groupService: GroupService
  ) {
    this.groupMemberService = groupMemberService;
    this.groupMemberValidation = groupMemberValidation;
    this.groupService = groupService;
  }

  public addNewGroupMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { name } = req.body;
      await this.groupMemberValidation.validateGroupMembersRequestParams(req);
      await this.groupMemberValidation.validateAddNewGroupMemberRequestBody(req);
      await this.groupService.checkGroupNotExistedById(Number(groupId));
      await this.groupMemberService.checkGroupMemberIsCreated(Number(groupId), name);
      const newGroupMember: GroupMember = await this.groupMemberService.addNewGroupMember(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new group's member successful", newGroupMember });
    } catch (error) {
      next(error);
    }
  };

  public getGroupMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.body;
      await this.groupMemberValidation.validateGroupMembersRequestParams(req);
      const groupMembers = await this.groupMemberService.getGroupMembersById(Number(groupId));
      res.status(HttpStatus.OK).json({ message: "Get group's members successful", groupMembers });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupMemberController;
