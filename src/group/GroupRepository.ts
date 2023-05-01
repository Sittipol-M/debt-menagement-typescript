import { DataSource, DeleteResult } from "typeorm";
import Group from "./Group";

class GroupRepository {
  private readonly dataSource: DataSource;

  public constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public save = async (group: Group): Promise<Group> => {
    const savedGroup: Group = await this.dataSource.getRepository(Group).save(group);
    return savedGroup;
  };

  public findAll = async (): Promise<Array<Group>> => {
    const groups: Array<Group> = await this.dataSource.getRepository(Group).find();
    return groups;
  };

  public findOne = async (group: Group): Promise<Group> => {
    const foundGroup: Group = await this.dataSource.getRepository(Group).findOneBy(group);
    return foundGroup;
  };

  public isExisted = async (group: Group): Promise<boolean> => {
    const isExisted: boolean = await this.dataSource.getRepository(Group).exist({ where: group });
    return isExisted;
  };

  public delete = async (group: Group): Promise<DeleteResult> => {
    const result: DeleteResult = await this.dataSource.getRepository(Group).delete(group);
    return result;
  };
}

export default GroupRepository;
