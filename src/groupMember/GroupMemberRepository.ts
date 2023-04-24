import { AppDataSource } from "../others/database/data-source";
import GroupMember from "./GroupMember";

class GroupMemberRepository {
  public findAllByGroupId = async (groupId: number): Promise<Array<GroupMember>> => {
    const groupMembers = await AppDataSource.getRepository(GroupMember).find({
      relations: { group: true },
      where: { group: { id: groupId } },
    });
    return groupMembers;
  };

  public isMemberExisted = async (groupMember: GroupMember): Promise<boolean> => {
    const isExisted: boolean = await AppDataSource.getRepository(GroupMember).exist({ where: groupMember });
    return isExisted;
  };

  public addNewMember = async (groupMember: GroupMember): Promise<GroupMember> => {
    const newGroupMember: GroupMember = await AppDataSource.getRepository(GroupMember).save(groupMember);
    return newGroupMember;
  };
}

export default GroupMemberRepository;
