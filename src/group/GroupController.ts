import { NextFunction, Request, Response } from "express";
import GroupService from "./GroupService";
import GroupValidation from "./GroupValidation";
import HttpStatus from "../others/enums/HttpStatus";

const groupService: GroupService = new GroupService();
const groupValidation: GroupValidation = new GroupValidation();

class GroupController {
  public addNewGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      await groupValidation.validateAddNewGroupRequestBody(req);
      await groupService.checkGroupIsCreated(name);
      const newGroup = await groupService.addNewGroup(req);
      res.status(HttpStatus.CREATED).json({ message: "Created group successful", newGroup });
    } catch (error) {
      next(error);
    }
  };

  public getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await groupService.getGroups();
      res.status(HttpStatus.OK).json({ message: "Get groups successful", groups });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupController;
