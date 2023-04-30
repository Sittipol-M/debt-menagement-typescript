import { DataSource } from "typeorm";
import Group from "../../group/Group";
import GroupMember from "../../groupMember/GroupMember";
import Debt from "../../debt/Debt";
import DebtMember from "../../debtMember/DebtMember";

class PostgresDataSource {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly database: string;
  private postgresDataSource: DataSource;

  public constructor(host: string, port: number, username: string, password: string, database: string) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  public initialize = async (): Promise<void> => {
    this.postgresDataSource = new DataSource({
      type: "postgres",
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: true,
      logging: false,
      entities: [Group, GroupMember, Debt, DebtMember],
      migrations: [],
      subscribers: [],
    });
    await this.postgresDataSource.initialize();
  };

  public getInstance = (): DataSource => {
    return this.postgresDataSource;
  };
}

export { PostgresDataSource };
