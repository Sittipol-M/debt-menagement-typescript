import { Request } from "express";
import Group from "./Group";
import GroupRepository from "./GroupRepository";
import DuplicationError from "../others/error/DuplicationError";
import NotFoundError from "../others/error/NotFoundError";

const groupRepository: GroupRepository = new GroupRepository();

class GroupService {
  public addNewGroup = async (req: Request): Promise<Group> => {
    const { name, description } = req.body;
    const group = new Group(null, name, description);
    const newGroup = await groupRepository.addNewGroup(group);
    return newGroup;
  };

  public checkGroupIsCreated = async (name: string): Promise<void> => {
    const group: Group = new Group();
    group.name = name;
    const isExisted = await groupRepository.isGroupExisted(group);
    if (isExisted) {
      throw new DuplicationError("Group's name is used");
    }
  };

  public checkGroupNotExistedById = async (id: number): Promise<void> => {
    const group: Group = new Group();
    group.id = id;
    const isExisted = await groupRepository.isGroupExisted(group);
    if (!isExisted) {
      throw new NotFoundError("Group not found");
    }
  };

  public getGroups = async (): Promise<Array<Group>> => {
    const groups = await groupRepository.findAll();
    return groups;
  };
}

export default GroupService;
