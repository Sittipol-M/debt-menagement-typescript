import Debt from "../entity/Debt";
import { PostgresDataSource } from "../others/database/PostgresDataSource";
import DebtMember from "../entity/DebtMember";

class DebtMemberRepository {
  public isDebtMemberExisted = async (debtMember: DebtMember): Promise<boolean> => {
    const isExisted: boolean = await PostgresDataSource.getRepository(DebtMember).exist({
      where: debtMember,
    });
    return isExisted;
  };

  public addNewDebtMember = async (debtMember: DebtMember): Promise<DebtMember> => {
    const newDebtMember = await PostgresDataSource.getRepository(DebtMember).save(debtMember);
    return newDebtMember;
  };

  public getDebtMembers = async (debt: Debt): Promise<Array<DebtMember>> => {
    const debtMembers = await PostgresDataSource.getRepository(DebtMember).find({ where: { debt } });
    return debtMembers;
  };
}

export default DebtMemberRepository;
