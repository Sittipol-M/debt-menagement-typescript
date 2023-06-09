import { Request } from "express";
import NotFoundError from "../others/error/NotFoundError";
import GroupMember from "./GroupMember";
import GroupMemberRepository from "./GroupMemberRepository";
import Group from "../group/Group";
import DuplicationError from "../others/error/DuplicationError";

const groupMemberRepository = new GroupMemberRepository();

class GroupMemberService {
  public getGroupMembersById = async (groupId: number): Promise<Array<GroupMember>> => {
    const groupMembers = await groupMemberRepository.findAllByGroupId(groupId);
    return groupMembers;
  };

  public checkMemberNotExistedById = async (groupId: number, groupMemberId: number): Promise<void> => {
    const group: Group = new Group(groupId);
    const groupMember: GroupMember = new GroupMember(groupMemberId, null, null, null, group);
    const isExisted = await groupMemberRepository.isMemberExisted(groupMember);
    if (!isExisted) {
      throw new NotFoundError("group's member not found");
    }
  };

  public addNewGroupMember = async (req: Request): Promise<GroupMember> => {
    const { groupId } = req.params;
    const { name, role, description } = req.body;
    const group: Group = new Group(Number(groupId));
    const groupMember: GroupMember = new GroupMember(null, role, name, description, group);
    const newGroupMember: GroupMember = await groupMemberRepository.addNewMember(groupMember);
    return newGroupMember;
  };

  public checkGroupMemberIsCreated = async (groupId: number, name: string): Promise<void> => {
    const group: Group = new Group(groupId);
    const groupMember: GroupMember = new GroupMember(null, null, name, null, group);
    const isExisted = await groupMemberRepository.isMemberExisted(groupMember);
    if (isExisted) {
      throw new DuplicationError("Group's member is created");
    }
  };
}

export default GroupMemberService;
