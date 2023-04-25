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
import DebtRoute from "../debt/DebtRoute";
import DebtMemberRoute from "../debtMember/DebtMemberRoute";
import GroupRoute from "../group/GroupRoute";
import GroupMemberRoute from "../groupMember/GroupMemberRoute";

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

// groups
const groupRouter: Router = new GroupRoute(groupController).getGroupRouter();
router.use(groupRouter);

// group members
const groupMemberRouter: Router = new GroupMemberRoute(groupMemberController).getGroupMemberRouter();
router.use(groupMemberRouter);

// debts
const debtRouter: Router = new DebtRoute(debtController).getDebtRouter();
router.use(debtRouter);

// debt members
const debtMemberRouter: Router = new DebtMemberRoute(debtMemberController).getDebMemberRouter();
router.use(debtMemberRouter);

export default router;
