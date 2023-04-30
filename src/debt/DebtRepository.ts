import { PostgresDataSource } from "../others/database/PostgresDataSource";
import Group from "../group/Group";
import Debt from "./Debt";
import { DataSource } from "typeorm";

class DebtRepository {
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public addNewDebt = async (debt: Debt): Promise<Debt> => {
    const newDebt: Debt = await this.dataSource.getRepository(Debt).save(debt);
    return newDebt;
  };

  public isDebtExisted = async (debt: Debt): Promise<boolean> => {
    const isExisted: boolean = await this.dataSource.getRepository(Debt).exist({ where: debt });
    return isExisted;
  };

  public getDebts = async (group: Group): Promise<Array<Debt>> => {
    const debts: Array<Debt> = await this.dataSource.getRepository(Debt).find({ where: { group } });
    return debts;
  };
}

export default DebtRepository;
