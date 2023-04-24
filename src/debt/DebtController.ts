import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import DebtValidation from "./DebtValidation";
import GroupService from "../group/GroupService";
import DebtService from "./DebtService";
import Debt from "./Debt";

const debtValidation = new DebtValidation();
const groupService = new GroupService();
const debtService = new DebtService();

class DebtController {
  public addNewDebt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      const { name } = req.body;
      await debtValidation.validateAddNewDebtRequestParams(req);
      await debtValidation.validateAddNewDebtRequestBody(req);
      await groupService.checkGroupNotExistedById(Number(groupId));
      await debtService.checkDebtIsCreated(Number(groupId), name);
      const newDebt: Debt = await debtService.addNewDebt(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new debt successful", newDebt });
    } catch (error) {
      next(error);
    }
  };

  public getDebts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groupId } = req.params;
      await debtValidation.validateAddNewDebtRequestParams(req);
      const debts: Array<Debt> = await debtService.getDebts(Number(groupId));
      res.status(HttpStatus.OK).json({ message: "Get debts successful", debts });
    } catch (error) {
      next(error);
    }
  };
}

export default DebtController;
