import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import DebtMemberValidation from "./DebtMemberValidation";
import GroupService from "../group/GroupService";
import DebtService from "../debt/DebtService";
import DebtMemberService from "./DebtMemberService";
import GroupMemberService from "../groupMember/GroupMemberService";
import DebtMember from "./DebtMember";

class DebtMemberController {
  private readonly debtMemberValidation: DebtMemberValidation;
  private readonly debtMemberService: DebtMemberService;
  private readonly debtService: DebtService;
  private readonly groupService: GroupService;
  private readonly groupMemberService: GroupMemberService;

  public constructor(
    debtMemberService: DebtMemberService,
    debtService: DebtService,
    groupService: GroupService,
    groupMemberService: GroupMemberService
  ) {
    this.debtMemberValidation = new DebtMemberValidation();
    this.debtMemberService = debtMemberService;
    this.debtService = debtService;
    this.groupService = groupService;
    this.groupMemberService = groupMemberService;
  }

  public addNewDebtMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { debtId, groupId } = req.params;
      const { groupMemberId } = req.body;
      await this.debtMemberValidation.validateDebtMemberRequestParams(req);
      await this.debtMemberValidation.validateAddNewDebtMemberRequestBody(req);
      await this.groupService.checkIfGroupNotExistedById(Number(groupId));
      await this.debtService.checkDebtNotExisted(Number(groupId), Number(debtId));
      await this.groupMemberService.checkMemberNotExistedById(Number(groupId), Number(groupMemberId));
      await this.debtMemberService.checkDebtMemberIsCreated(
        Number(groupId),
        Number(debtId),
        Number(groupMemberId)
      );
      const debtMember: DebtMember = await this.debtMemberService.addNewDebtMember(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new debt's member successful", debtMember });
    } catch (error) {
      next(error);
    }
  };

  public getDebtMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.debtMemberValidation.validateDebtMemberRequestParams(req);
      const debtMembers: Array<DebtMember> = await this.debtMemberService.getDebtMembers(req);
      res.status(HttpStatus.OK).json({ message: "Get debt's members successful", debtMembers });
    } catch (error) {
      next(error);
    }
  };
}

export default DebtMemberController;
