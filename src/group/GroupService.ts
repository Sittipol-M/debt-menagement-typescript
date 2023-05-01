import Group from "./Group";
import GroupRepository from "./GroupRepository";
import DuplicationError from "../others/error/DuplicationError";
import NotFoundError from "../others/error/NotFoundError";
class GroupService {
  private readonly groupRepository: GroupRepository;

  public constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public addNewGroup = async (group: Group): Promise<Group> => {
    const newGroup = await this.groupRepository.save(group);
    return newGroup;
  };

  public checkIfGroupCreatedByName = async (name: string): Promise<void> => {
    const group: Group = new Group(null, name);
    const isExisted = await this.groupRepository.isExisted(group);
    if (isExisted) {
      throw new DuplicationError("Group's name is used");
    }
  };

  public checkIfGroupNotExistedById = async (id: number): Promise<void> => {
    const group: Group = new Group(id);
    const isExisted = await this.groupRepository.isExisted(group);
    if (!isExisted) {
      throw new NotFoundError("Group not found");
    }
  };

  public getGroups = async (): Promise<Array<Group>> => {
    const groups = await this.groupRepository.findAll();
    return groups;
  };

  public deleteByName = async (name: string): Promise<void> => {
    const group: Group = new Group(null, name);
    await this.groupRepository.delete(group);
  };
}

export default GroupService;
