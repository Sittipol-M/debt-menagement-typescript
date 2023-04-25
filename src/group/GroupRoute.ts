import { Router } from "express";
import GroupController from "./GroupController";

class GroupRoute {
  private readonly url: string = `/api/v1/groups`;
  private readonly router: Router;
  private readonly groupController: GroupController;

  public constructor(groupController: GroupController) {
    this.groupController = groupController;
    this.router = Router();
  }

  public getGroupRouter = (): Router => {
    this.router.post(this.url, this.groupController.addNewGroup);
    this.router.get(this.url, this.groupController.getGroups);
    return this.router;
  };
}

export default GroupRoute;
