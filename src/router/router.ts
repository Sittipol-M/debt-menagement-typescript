import { Router } from "express";
import GroupController from "../group/GroupController";
import GroupMemberController from "../groupMember/GroupMemberController";
import DebtController from "../debt/DebtController";
import DebtMemberController from "../debtMember/DebtMemberController";
import GroupService from "../group/GroupService";
import GroupRepository from "../group/GroupRepository";
import GroupValidation from "../group/GroupValidation";
import GroupMemberService from "../groupMember/GroupMemberService";
import GroupMemberRepository from "../groupMember/GroupMemberRepository";
import GroupMemberValidation from "../groupMember/GroupMemberValidation";
import DebtValidation from "../debt/DebtValidation";
import DebtService from "../debt/DebtService";
import DebtRepository from "../debt/DebtRepository";
import DebtMemberRepository from "../debtMember/DebtMemberRepository";
import DebtMemberValidation from "../debtMember/DebtMemberValidation";
import DebtMemberService from "../debtMember/DebtMemberService";

const router: Router = Router();

// repositories
const groupRepository = new GroupRepository();
const groupMemberRepository = new GroupMemberRepository();
const debtRepository = new DebtRepository();
const debtMemberRepository = new DebtMemberRepository();

// validations
const groupValidation = new GroupValidation();
const groupMemberValidation = new GroupMemberValidation();
const debtValidation = new DebtValidation();
const debtMemberValidation = new DebtMemberValidation();

// services
const groupService = new GroupService(groupRepository);
const groupMemberService = new GroupMemberService(groupMemberRepository);
const debtService = new DebtService(debtRepository);
const debtMemberService = new DebtMemberService(debtMemberRepository);

const groupController: GroupController = new GroupController(groupService, groupValidation);
const groupMemberController: GroupMemberController = new GroupMemberController(
  groupMemberService,
  groupMemberValidation,
  groupService
);
const debtController: DebtController = new DebtController(debtValidation, debtService, groupService);
const debtMemberController: DebtMemberController = new DebtMemberController(
  debtMemberValidation,
  debtMemberService,
  debtService,
  groupService,
  groupMemberService
);

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
