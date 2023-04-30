import { Router } from "express";
import GroupController from "../group/GroupController";
import GroupMemberController from "../groupMember/GroupMemberController";
import DebtController from "../debt/DebtController";
import DebtMemberController from "../debtMember/DebtMemberController";
import GroupService from "../group/GroupService";
import GroupRepository from "../group/GroupRepository";
import GroupMemberService from "../groupMember/GroupMemberService";
import GroupMemberRepository from "../groupMember/GroupMemberRepository";
import DebtService from "../debt/DebtService";
import DebtRepository from "../debt/DebtRepository";
import DebtMemberRepository from "../debtMember/DebtMemberRepository";
import DebtMemberService from "../debtMember/DebtMemberService";
import DebtRoute from "../debt/DebtRoute";
import DebtMemberRoute from "../debtMember/DebtMemberRoute";
import GroupRoute from "../group/GroupRoute";
import GroupMemberRoute from "../groupMember/GroupMemberRoute";
import { DataSource } from "typeorm";

class AllRoute {
  private readonly defaultUrl: string = "/api/v1";
  private readonly router: Router;
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.router = Router();
    this.dataSource = dataSource;
  }

  public getRouter = (): Router => {
    // Repositories
    const groupRepository: GroupRepository = new GroupRepository(this.dataSource);
    const groupMemberRepository: GroupMemberRepository = new GroupMemberRepository(this.dataSource);
    const debtRepository: DebtRepository = new DebtRepository(this.dataSource);
    const debtMemberRepository: DebtMemberRepository = new DebtMemberRepository(this.dataSource);
    // Services
    const groupService: GroupService = new GroupService(groupRepository);
    const groupMemberService: GroupMemberService = new GroupMemberService(groupMemberRepository);
    const debtService: DebtService = new DebtService(debtRepository);
    const debtMemberService: DebtMemberService = new DebtMemberService(debtMemberRepository);
    // Controllers
    const groupController: GroupController = new GroupController(groupService);
    const groupMemberController: GroupMemberController = new GroupMemberController(
      groupMemberService,
      groupService
    );
    const debtController: DebtController = new DebtController(debtService, groupService);
    const debtMemberController: DebtMemberController = new DebtMemberController(
      debtMemberService,
      debtService,
      groupService,
      groupMemberService
    );
    // groups
    const groupRouter: Router = new GroupRoute(groupController).getGroupRouter();
    this.router.use(this.defaultUrl, groupRouter);
    // group members
    const groupMemberRouter: Router = new GroupMemberRoute(groupMemberController).getGroupMemberRouter();
    this.router.use(this.defaultUrl, groupMemberRouter);
    // debts
    const debtRouter: Router = new DebtRoute(debtController).getDebtRouter();
    this.router.use(this.defaultUrl, debtRouter);
    // debt members
    const debtMemberRouter: Router = new DebtMemberRoute(debtMemberController).getDebMemberRouter();
    this.router.use(this.defaultUrl, debtMemberRouter);
    return this.router;
  };
}

export default AllRoute;
