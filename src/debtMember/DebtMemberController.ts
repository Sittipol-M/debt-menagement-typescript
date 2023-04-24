import { NextFunction, Request, Response } from "express";
import HttpStatus from "../others/enums/HttpStatus";
import DebtMemberValidation from "./DebtMemberValidation";
import GroupService from "../group/GroupService";
import DebtService from "../debt/DebtService";
import DebtMemberService from "./DebtMemberService";
import GroupMemberService from "../groupMember/GroupMemberService";

const debtMemberValidation = new DebtMemberValidation();
const groupService = new GroupService();
const debtService = new DebtService();
const groupMemberService = new GroupMemberService();
const debtMemberService = new DebtMemberService();

class DebtMemberController {
  public addNewDebtMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { debtId, groupId } = req.params;
      const { groupMemberId } = req.body;
      await debtMemberValidation.validateAddNewDebtMemberRequestParams(req);
      await debtMemberValidation.validateAddNewDebtMemberRequestBody(req);
      await groupService.checkGroupNotExistedById(Number(groupId));
      await debtService.checkDebtNotExisted(Number(groupId), Number(debtId));
      await groupMemberService.checkMemberNotExistedById(Number(groupId), Number(groupMemberId));
      await debtMemberService.checkDebtMemberIsCreated(
        Number(groupId),
        Number(debtId),
        Number(groupMemberId)
      );
      await debtMemberService.addNewDebtMember(req);
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
