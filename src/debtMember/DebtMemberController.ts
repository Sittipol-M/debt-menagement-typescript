import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import DebtMemberValidation from "./DebtMemberValidation";
import GroupService from "../group/GroupService";
import DebtService from "../debt/DebtService";
import DebtMemberService from "./DebtMemberService";
import GroupMemberService from "../groupMember/GroupMemberService";

class DebtMemberController {
  private readonly debtMemberValidation: DebtMemberValidation;
  private readonly debtMemberService: DebtMemberService;
  private readonly debtService: DebtService;
  private readonly groupService: GroupService;
  private readonly groupMemberService: GroupMemberService;

  public constructor(
    debtMemberValidation: DebtMemberValidation,
    debtMemberService: DebtMemberService,
    debtService: DebtService,
    groupService: GroupService,
    groupMemberService: GroupMemberService
  ) {
    this.debtMemberValidation = debtMemberValidation;
    this.debtMemberService = debtMemberService;
    this.debtService = debtService;
    this.groupService = groupService;
    this.groupMemberService = groupMemberService;
  }

  public addNewDebtMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { debtId, groupId } = req.params;
      const { groupMemberId } = req.body;
      await this.debtMemberValidation.validateAddNewDebtMemberRequestParams(req);
      await this.debtMemberValidation.validateAddNewDebtMemberRequestBody(req);
      await this.groupService.checkGroupNotExistedById(Number(groupId));
      await this.debtService.checkDebtNotExisted(Number(groupId), Number(debtId));
      await this.groupMemberService.checkMemberNotExistedById(Number(groupId), Number(groupMemberId));
      await this.debtMemberService.checkDebtMemberIsCreated(
        Number(groupId),
        Number(debtId),
        Number(groupMemberId)
      );
      await this.debtMemberService.addNewDebtMember(req);
      res.status(HttpStatus.CREATED).json({ message: "Add new debt's member successful" });
    } catch (error) {
      next(error);
    }
  };

  public getDebtMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(HttpStatus.OK).json({ message: "Get debt's members successful" });
    } catch (error) {
      next(error);
    }
  };
}

export default DebtMemberController;
