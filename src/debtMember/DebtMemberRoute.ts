import { Router } from "express";
import DebtMemberController from "./DebtMemberController";

class DebtMemberRoute {
  private readonly url: string = `/api/v1/groups/:groupId/debts/:debtId/debt-members`;
  private readonly router: Router;
  private readonly debtMemberController: DebtMemberController;

  public constructor(debtMemberController: DebtMemberController) {
    this.debtMemberController = debtMemberController;
    this.router = Router();
  }

  public getDebMemberRouter = (): Router => {
    this.router.post(this.url, this.debtMemberController.addNewDebtMember);
    this.router.get(this.url, this.debtMemberController.getDebtMembers);
    return this.router;
  };
}

export default DebtMemberRoute;
