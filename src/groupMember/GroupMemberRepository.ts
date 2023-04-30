import GroupMember from "./GroupMember";
import { DataSource } from "typeorm";

class GroupMemberRepository {
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public findAllByGroupId = async (groupId: number): Promise<Array<GroupMember>> => {
    const groupMembers = await this.dataSource.getRepository(GroupMember).find({
      relations: { group: true },
      where: { group: { id: groupId } },
    });
    return groupMembers;
  };

  public isMemberExisted = async (groupMember: GroupMember): Promise<boolean> => {
    const isExisted: boolean = await this.dataSource.getRepository(GroupMember).exist({
      where: groupMember,
    });
    return isExisted;
  };

  public addNewMember = async (groupMember: GroupMember): Promise<GroupMember> => {
    const newGroupMember: GroupMember = await this.dataSource.getRepository(GroupMember).save(groupMember);
    return newGroupMember;
  };
}

export default GroupMemberRepository;
