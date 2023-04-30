import { DataSource, DeleteResult } from "typeorm";
import Group from "./Group";

class GroupRepository {
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public addNewGroup = async (group: Group): Promise<Group> => {
    const newGroup: Group = await this.dataSource.getRepository(Group).save(group);
    return newGroup;
  };

  public findAll = async (): Promise<Array<Group>> => {
    const groups: Array<Group> = await this.dataSource.getRepository(Group).find();
    return groups;
  };

  public findOneByName = async (name: string): Promise<Group> => {
    const group: Group = await this.dataSource.getRepository(Group).findOneBy({ name });
    return group;
  };

  public isGroupExisted = async (group: Group): Promise<boolean> => {
    const isExisted: boolean = await this.dataSource.getRepository(Group).exist({ where: group });
    return isExisted;
  };

  public deleteGroup = async (group: Group): Promise<DeleteResult> => {
    const result: DeleteResult = await this.dataSource.getRepository(Group).delete(group);
    return result;
  };
}

export default GroupRepository;
