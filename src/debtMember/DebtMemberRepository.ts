import Debt from "../debt/Debt";
import { AppDataSource } from "../others/database/data-source";
import DebtMember from "./DebtMember";

class DebtMemberRepository {
  public isDebtMemberExisted = async (debtMember: DebtMember): Promise<boolean> => {
    const isExisted: boolean = await AppDataSource.getRepository(DebtMember).exist({ where: debtMember });
    return isExisted;
  };

  public addNewDebtMember = async (debtMember: DebtMember): Promise<DebtMember> => {
    const newDebtMember = await AppDataSource.getRepository(DebtMember).save(debtMember);
    return newDebtMember;
  };

  public getDebtMembers = async (debt: Debt): Promise<Array<DebtMember>> => {
    const debtMembers = await AppDataSource.getRepository(DebtMember).find({ where: { debt } });
    return debtMembers;
  };
}

export default DebtMemberRepository;
