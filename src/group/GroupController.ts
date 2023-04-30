import { NextFunction, Request, Response } from "express";
import GroupService from "./GroupService";
import GroupValidation from "./GroupValidation";
import HttpStatus from "../others/enums/HttpStatus";
import Group from "./Group";

class GroupController {
  private readonly groupService: GroupService;
  private readonly groupValidation: GroupValidation;

  public constructor(groupService: GroupService) {
    this.groupService = groupService;
    this.groupValidation = new GroupValidation();
  }

  public addNewGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description } = req.body;
      await this.groupValidation.validateAddNewGroupRequestBody(req);
      await this.groupService.checkGroupIsCreated(name);
      const newGroup = await this.groupService.addNewGroup(new Group(null, name, description));
      res.status(HttpStatus.CREATED).json({ message: "Created group successful", newGroup });
    } catch (error) {
      next(error);
    }
  };

  public getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getGroups();
      res.status(HttpStatus.OK).json({ message: "Get groups successful", groups });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupController;
