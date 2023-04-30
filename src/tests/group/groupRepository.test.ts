import dotenv from "dotenv";
import GroupRepository from "../../group/GroupRepository";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../group/Group";

describe("GroupRepository", () => {
  let groupRepository: GroupRepository;
  let postgresDataSource: PostgresDataSource;
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
  });

  test("save", async () => {
    const newGroup: Group = await groupRepository.save(groupForTest);
    expect(newGroup).toBe(groupForTest);
    delete groupForTest.createdAt;
    delete groupForTest.updatedAt;
    delete groupForTest.id;
  });

  test("findAll (before deleteGroup)", async () => {
    const groups: Array<Group> = await groupRepository.findAll();
    expect(groups[0].name).toBe(groupForTest.name);
  });

  test("findOne (before deleteGroup)", async () => {
    const group: Group = await groupRepository.findOne(groupForTest);
    expect(group.name).toBe(group.name);
  });

  test("isExisted (before deleteGroup)", async () => {
    const isExisted: boolean = await groupRepository.isExisted(groupForTest);
    expect(isExisted).toBe(true);
  });

  test("deleteGroup", async () => {
    const result = await groupRepository.delete(groupForTest);
    expect(result.affected).toEqual(1);
  });

  test("findAll (after deleteGroup)", async () => {
    const groups: Array<Group> = await groupRepository.findAll();
    expect(groups.length).toBe(0);
  });

  test("findOne (after deleteGroup)", async () => {
    const group: Group = await groupRepository.findOne(groupForTest);
    expect(group).toBe(undefined || null);
  });

  test("isGroupExisted (after deleteGroup)", async () => {
    const isExisted: boolean = await groupRepository.isExisted(groupForTest);
    expect(isExisted).toBe(false);
  });
});
