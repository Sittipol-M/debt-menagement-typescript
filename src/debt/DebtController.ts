import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import DebtValidation from "./DebtValidation";
import GroupService from "../group/GroupService";
import DebtService from "./DebtService";
import Debt from "./Debt";
class DebtController {
  private readonly debtValidation: DebtValidation;
  private readonly debtService: DebtService;
  private readonly groupService: GroupService;

  public constructor(debtValidation: DebtValidation, debtService: DebtService, groupService: GroupService) {
    this.debtValidation = debtValidation;
    this.debtService = debtService;
    this.groupService = groupService;
  }

  public addNewDebt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { name } = req.body;
      await this.debtValidation.validateAddNewDebtRequestParams(req);
      await this.debtValidation.validateAddNewDebtRequestBody(req);
      await this.groupService.checkGroupNotExistedById(Number(groupId));
      await this.debtService.checkDebtIsCreated(Number(groupId), name);
      const newDebt: Debt = await this.debtService.addNewDebt(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new debt successful", newDebt });
    } catch (error) {
      next(error);
    }
  };

  public getDebts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      await this.debtValidation.validateAddNewDebtRequestParams(req);
      const debts: Array<Debt> = await this.debtService.getDebts(Number(groupId));
      res.status(HttpStatus.OK).json({ message: "Get debts successful", debts });
    } catch (error) {
      next(error);
    }
  };
}

export default DebtController;
