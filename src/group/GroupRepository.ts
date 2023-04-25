import { DataSource } from "typeorm";
import { PostgresDataSource } from "../others/database/PostgresDataSource";
import Group from "../entity/Group";

class GroupRepository {
  private readonly postgresDataSource: DataSource;

  public addNewGroup = async (group: Group): Promise<Group> => {
    const newGroup: Group = await PostgresDataSource.getRepository(Group).save(group);
    return newGroup;
  };

  public findAll = async (): Promise<Array<Group>> => {
    const groups: Array<Group> = await PostgresDataSource.getRepository(Group).find();
    return groups;
  };

  public findOneByName = async (name: string): Promise<Group> => {
    const group: Group = await PostgresDataSource.getRepository(Group).findOneBy({ name });
    return group;
  };

  public isGroupExisted = async (group: Group): Promise<boolean> => {
    const isExisted: boolean = await PostgresDataSource.getRepository(Group).exist({ where: group });
    return isExisted;
  };
}

export default GroupRepository;
