import { Request } from "express";
import DebtRepository from "./DebtRepository";
import Debt from "./Debt";
import Group from "../group/Group";
import DuplicationError from "../others/error/DuplicationError";

const debtRepository = new DebtRepository();

class DebtService {
  public checkDebtIsCreated = async (groupId: number, name: string): Promise<void> => {
    const group: Group = new Group(Number(groupId));
    const debt: Debt = new Debt(null, name, null, group);
    const isExisted = await debtRepository.isDebtExisted(debt);
    if (isExisted) {
      throw new DuplicationError("Debt's name is used");
    }
  };

  public checkDebtNotExisted = async (groupId: number, debtId: number): Promise<void> => {
    const group: Group = new Group(groupId);
    const debt: Debt = new Debt(debtId, null, null, group);
    const isExisted = await debtRepository.isDebtExisted(debt);
    if (!isExisted) {
      throw new DuplicationError("Dept not found");
    }
  };

  public addNewDebt = async (req: Request): Promise<Debt> => {
    const { name, amount } = req.body;
    const { groupId } = req.params;
    const group: Group = new Group(Number(groupId));
    const newDebt = await debtRepository.addNewDebt(new Debt(null, name, amount, group));
    return newDebt;
  };

  public getDebts = async (groupId: number): Promise<Array<Debt>> => {
    const group: Group = new Group(Number(groupId));
    const debts = await debtRepository.getDebts(group);
    return debts;
  };
}

export default DebtService;
