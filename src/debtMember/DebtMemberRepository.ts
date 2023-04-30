import Debt from "../debt/Debt";
import DebtMember from "./DebtMember";
import { DataSource } from "typeorm";

class DebtMemberRepository {
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public isDebtMemberExisted = async (debtMember: DebtMember): Promise<boolean> => {
    const isExisted: boolean = await this.dataSource.getRepository(DebtMember).exist({
      where: debtMember,
    });
    return isExisted;
  };

  public addNewDebtMember = async (debtMember: DebtMember): Promise<DebtMember> => {
    const newDebtMember = await this.dataSource.getRepository(DebtMember).save(debtMember);
    return newDebtMember;
  };

  public getDebtMembers = async (debt: Debt): Promise<Array<DebtMember>> => {
    const debtMembers = await this.dataSource.getRepository(DebtMember).find({ where: { debt } });
    return debtMembers;
  };
}

export default DebtMemberRepository;
