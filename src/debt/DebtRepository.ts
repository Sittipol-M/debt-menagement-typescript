import { AppDataSource } from "../others/database/data-source";
import Group from "../group/Group";
import Debt from "./Debt";

class DebtRepository {
  public addNewDebt = async (debt: Debt): Promise<Debt> => {
    const newDebt: Debt = await AppDataSource.getRepository(Debt).save(debt);
    return newDebt;
  };

  public isDebtExisted = async (debt: Debt): Promise<boolean> => {
    const isExisted: boolean = await AppDataSource.getRepository(Debt).exist({ where: debt });
    return isExisted;
  };

  public getDebts = async (group: Group): Promise<Array<Debt>> => {
    const debts: Array<Debt> = await AppDataSource.getRepository(Debt).find({ where: { group } });
    return debts;
  };
}

export default DebtRepository;
