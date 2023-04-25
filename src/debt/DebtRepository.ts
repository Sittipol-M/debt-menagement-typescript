import { PostgresDataSource } from "../others/database/PostgresDataSource";
import Group from "../entity/Group";
import Debt from "../entity/Debt";

class DebtRepository {
  public addNewDebt = async (debt: Debt): Promise<Debt> => {
    const newDebt: Debt = await PostgresDataSource.getRepository(Debt).save(debt);
    return newDebt;
  };

  public isDebtExisted = async (debt: Debt): Promise<boolean> => {
    const isExisted: boolean = await PostgresDataSource.getRepository(Debt).exist({ where: debt });
    return isExisted;
  };

  public getDebts = async (group: Group): Promise<Array<Debt>> => {
    const debts: Array<Debt> = await PostgresDataSource.getRepository(Debt).find({ where: { group } });
    return debts;
  };
}

export default DebtRepository;
