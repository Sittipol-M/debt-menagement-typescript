import { PostgresDataSource } from "../others/database/PostgresDataSource";
import GroupMember from "../entity/GroupMember";

class GroupMemberRepository {
  public findAllByGroupId = async (groupId: number): Promise<Array<GroupMember>> => {
    const groupMembers = await PostgresDataSource.getRepository(GroupMember).find({
      relations: { group: true },
      where: { group: { id: groupId } },
    });
    return groupMembers;
  };

  public isMemberExisted = async (groupMember: GroupMember): Promise<boolean> => {
    const isExisted: boolean = await PostgresDataSource.getRepository(GroupMember).exist({
      where: groupMember,
    });
    return isExisted;
  };

  public addNewMember = async (groupMember: GroupMember): Promise<GroupMember> => {
    const newGroupMember: GroupMember = await PostgresDataSource.getRepository(GroupMember).save(groupMember);
    return newGroupMember;
  };
}

export default GroupMemberRepository;
