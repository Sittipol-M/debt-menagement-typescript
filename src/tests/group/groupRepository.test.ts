import { DataSource } from "typeorm";
import GroupRepository from "../../group/GroupRepository";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../entity/Group";

describe("test group", () => {
  let postgresDataSource: DataSource;
  let groupRepository: GroupRepository;
  beforeAll(async () => {
    groupRepository = new GroupRepository();
    postgresDataSource = PostgresDataSource;
    await postgresDataSource.initialize();
  });
  it("test group 1", async () => {
    const groups: Array<Group> = await groupRepository.findAll();
    console.log({ groups });
  });
});
