import { Request } from "express";
import Debt from "../debt/Debt";
import Group from "../group/Group";
import GroupMember from "../groupMember/GroupMember";
import DuplicationError from "../others/error/DuplicationError";
import DebtMember from "./DebtMember";
import DebtMemberRepository from "./DebtMemberRepository";
class DebtMemberService {
  private readonly debtMemberRepository: DebtMemberRepository;

  public constructor(debtMemberRepository: DebtMemberRepository) {
    this.debtMemberRepository = debtMemberRepository;
  }

  public checkDebtMemberIsCreated = async (
    groupId: number,
    debtId: number,
    groupMemberId: number
  ): Promise<void> => {
    const group: Group = new Group(groupId);
    const debt: Debt = new Debt(debtId, null, null, group);
    const groupMember: GroupMember = new GroupMember(groupMemberId);
    const debtMember: DebtMember = new DebtMember(null, null, null, null, groupMember, debt);
    const isExisted = await this.debtMemberRepository.isDebtMemberExisted(debtMember);
    if (isExisted) {
      throw new DuplicationError("This member is added to debt already");
    }
  };

  public addNewDebtMember = async (req: Request): Promise<DebtMember> => {
    const { debtId, groupId } = req.params;
    const { groupMemberId, role } = req.body;
    const group: Group = new Group(Number(groupId));
    const debt: Debt = new Debt(Number(debtId), null, null, group);
    const groupMember: GroupMember = new GroupMember(groupMemberId);
    const debtMember: DebtMember = new DebtMember(null, role, null, null, groupMember, debt);
    const newDebtMember = await this.debtMemberRepository.addNewDebtMember(debtMember);
    return newDebtMember;
  };

  public getDebtMembers = async (req: Request): Promise<Array<DebtMember>> => {
    const { debtId, groupId } = req.params;
    const group: Group = new Group(Number(groupId));
    const debt: Debt = new Debt(Number(debtId), null, null, group);
    const debtMembers: Array<DebtMember> = await this.debtMemberRepository.getDebtMembers(debt);
    return debtMembers;
  };
}

export default DebtMemberService;
