import GroupRepository from "../../group/GroupRepository";
import GroupService from "../../group/GroupService";
import dotenv from "dotenv";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../group/Group";
import { Request, request } from "express";
import DuplicationError from "../../others/error/DuplicationError";

describe.skip("GroupService", () => {
  let groupService: GroupService;
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
    groupService = new GroupService(groupRepository);
  });

  test("addNewGroup", async () => {
    const newGroup: Group = await groupService.addNewGroup(groupForTest);
    expect(newGroup.name).toBe(groupForTest.name);
  });

  //   test("checkGroupIsCreated", async () => {
  //     // try {
  //     //   await groupService.checkGroupIsCreated(groupForTest.name);
  //     // } catch (error) {
  //     //   expect(error).t;
  //     // }
  //     expect(async () => await groupService.checkGroupIsCreated(groupForTest.name)).rejects.toThrow(
  //       DuplicationError
  //     );
  //   });
});
