import { Router } from "express";
import GroupMemberController from "./GroupMemberController";

class GroupMemberRoute {
  private readonly url: string = `/api/v1/groups/:groupId/group-members`;
  private readonly router: Router;
  private readonly groupMemberController: GroupMemberController;

  public constructor(groupMemberController: GroupMemberController) {
    this.groupMemberController = groupMemberController;
    this.router = Router();
  }

  public getGroupMemberRouter = (): Router => {
    this.router.post(this.url, this.groupMemberController.addNewGroupMember);
    this.router.get(this.url, this.groupMemberController.getGroupMembers);
    return this.router;
  };
}

export default GroupMemberRoute;
