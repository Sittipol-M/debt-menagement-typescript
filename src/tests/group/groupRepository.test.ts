import dotenv from "dotenv";
import GroupRepository from "../../group/GroupRepository";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../group/Group";

describe("Group Repository", () => {
  let groupRepository: GroupRepository;
  let postgresDataSource: PostgresDataSource;
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

  test("addNewGroup", async () => {
    const group: Group = new Group(null, "groupNameTest", "groupDescription");
    const newGroup = await groupRepository.addNewGroup(group);
    expect(newGroup).toEqual(group);
  });
});
