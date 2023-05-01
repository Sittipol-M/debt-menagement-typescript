import GroupRepository from "../../group/GroupRepository";
import GroupService from "../../group/GroupService";
import dotenv from "dotenv";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../group/Group";
import DuplicationError from "../../others/error/DuplicationError";
import NotFoundError from "../../others/error/NotFoundError";

describe("GroupService", () => {
  let groupService: GroupService;
  let groupRepository: GroupRepository;
  let postgresDataSource: PostgresDataSource;
  let savedGroup: Group;
  const groupForTest: Group = new Group(null, "groupNameTest", "groupDescription");
  beforeAll(async () => {
    dotenv.config({ path: __dirname + "./../../../.env.test" });
    postgresDataSource = new PostgresDataSource(
      process.env.POSTGRES_HOST,
      Number(process.env.POSTGRES_PORT),
      process.env.POSTGRES_USERNAME,
      process.env.POSTGRES_PASSWORD,
      process.env.POSTGRES_DATABASE
    );
    await postgresDataSource.initialize();
    groupRepository = new GroupRepository(postgresDataSource.getInstance());
    groupService = new GroupService(groupRepository);
  });

  test("addNewGroup", async () => {
    savedGroup = await groupService.addNewGroup(groupForTest);
    expect(savedGroup.name).toBe(groupForTest.name);
  });

  test("checkGroupIsCreated (before deleteByName)", async () => {
    const check: Function = async () => {
      await groupService.checkIfGroupCreatedByName(groupForTest.name);
    };
    expect(check).rejects.toThrowError(DuplicationError);
  });

  test("getGroups (before deleteByName)", async () => {
    const groups: Array<Group> = await groupService.getGroups();
    expect(groups[0].name).toBe(savedGroup.name);
  });

  test("delete", async () => {
    await groupService.deleteByName(groupForTest.name);
  });

  test("checkIfGroupNotExistedById", async () => {
    const check: Function = async () => {
      await groupService.checkIfGroupNotExistedById(savedGroup.id);
    };
    expect(check).rejects.toThrowError(NotFoundError);
  });
  afterAll(async () => {
    await postgresDataSource.getInstance().getRepository(Group).delete({});
  });
});
