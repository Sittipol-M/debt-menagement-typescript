import { Router } from "express";
import GroupController from "../group/GroupController";
import GroupMemberController from "../groupMember/GroupMemberController";
import DebtController from "../debt/DebtController";
import DebtMemberController from "../debtMember/DebtMemberController";

const router: Router = Router();

const groupController: GroupController = new GroupController();
const groupMemberController: GroupMemberController = new GroupMemberController();
const debtController: DebtController = new DebtController();
const debtMemberController: DebtMemberController = new DebtMemberController();

const defaultUrl: string = "/api/v1";

// groups
const groupsUrl: string = `${defaultUrl}/groups`;
router.post(groupsUrl, groupController.addNewGroup);
router.get(groupsUrl, groupController.getGroups);

// group members
const groupMembersUrl: string = `${groupsUrl}/:groupId/group-members`;
router.post(groupMembersUrl, groupMemberController.addNewGroupMember);
router.get(groupMembersUrl, groupMemberController.getGroupMembers);

// debts
const debtsUrl: string = `${groupsUrl}/:groupId/debts`;
router.post(debtsUrl, debtController.addNewDebt);
router.get(debtsUrl, debtController.getDebts);

// debt members
const debtMembersUrl: string = `${debtsUrl}/:debtId/debt-members`;
router.post(debtMembersUrl, debtMemberController.addNewDebtMember);
router.get(debtMembersUrl, debtMemberController.getDebtMembers);

export default router;
