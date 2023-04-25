import { Router } from "express";
import DebtController from "./DebtController";

class DebtRoute {
  private readonly url: string = `"/api/v1/groups/:groupId/debts`;
  private readonly debtRouter: Router;
  private readonly debtController: DebtController;

  public constructor(debtController: DebtController) {
    this.debtController = debtController;
    this.debtRouter = Router();
  }

  public getDebtRouter = (): Router => {
    this.debtRouter.post(this.url, this.debtController.addNewDebt);
    this.debtRouter.get(this.url, this.debtController.getDebts);
    return this.debtRouter;
  };
}

export default DebtRoute;
