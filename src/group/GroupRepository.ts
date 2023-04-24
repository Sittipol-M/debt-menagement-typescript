import { AppDataSource } from "../others/database/data-source";
import Group from "./Group";

class GroupRepository {
  public addNewGroup = async (group: Group): Promise<Group> => {
    const newGroup: Group = await AppDataSource.getRepository(Group).save(group);
    return newGroup;
  };

  public findAll = async (): Promise<Array<Group>> => {
    const groups: Array<Group> = await AppDataSource.getRepository(Group).find();
    return groups;
  };

  public findOneByName = async (name: string): Promise<Group> => {
    const group: Group = await AppDataSource.getRepository(Group).findOneBy({ name });
    return group;
  };

  public isGroupExisted = async (group: Group): Promise<boolean> => {
    const isExisted: boolean = await AppDataSource.getRepository(Group).exist({ where: group });
    return isExisted;
  };
}

export default GroupRepository;
