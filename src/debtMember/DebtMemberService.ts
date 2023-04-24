import { Request } from "express";
import Debt from "../debt/Debt";
import Group from "../group/Group";
import GroupMember from "../groupMember/GroupMember";
import DuplicationError from "../others/error/DuplicationError";
import DebtMember from "./DebtMember";
import DebtMemberRepository from "./DebtMemberRepository";

const debtMemberRepository = new DebtMemberRepository();

class DebtMemberService {
  public checkDebtMemberIsCreated = async (
    groupId: number,
    debtId: number,
    groupMemberId: number
  ): Promise<void> => {
    const group: Group = new Group(groupId);
    const debt: Debt = new Debt(debtId, null, null, group);
    const groupMember: GroupMember = new GroupMember(groupMemberId);
    const debtMember: DebtMember = new DebtMember(null, null, null, null, groupMember, debt);
    const isExisted = await debtMemberRepository.isDebtMemberExisted(debtMember);
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
    const newDebtMember = await debtMemberRepository.addNewDebtMember(debtMember);
    return newDebtMember;
  };
}

export default DebtMemberService;
