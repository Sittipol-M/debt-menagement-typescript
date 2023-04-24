import "reflect-metadata";
import { DataSource } from "typeorm";
import Group from "../../group/Group";
import GroupMember from "../../groupMember/GroupMember";
import Debt from "../../debt/Debt";
import DebtMember from "../../debtMember/DebtMember";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Group, GroupMember, Debt, DebtMember],
  migrations: [],
  subscribers: [],
});
