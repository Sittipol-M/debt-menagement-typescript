import { Express } from "express";
import App from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import app from "../../app";
import { PostgresDataSource } from "../../others/database/PostgresDataSource";
import Group from "../../group/Group";

const defaultUrl = "/api/v1";

describe("POST /groups", () => {
  let app: Express;
  let postgresDataSource: PostgresDataSource;
  let groupUrl: string = `${defaultUrl}/groups`;
  let groupForTest = { name: "groupName" };
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
    app = await new App().createServer();
  });

  test("POST /groups", async () => {
    const res = await request(app).post(groupUrl).set("Content-type", "application/json").send(groupForTest);
    expect(res.statusCode).toBe(201);
  });

  test("GET /groups", async () => {
    const res = await request(app).get(groupUrl);
    console.log(res.body);
    expect(res.body.groups[0].name).toBe(groupForTest.name);
  });

  afterAll(async () => {
    await postgresDataSource.getInstance().getRepository(Group).delete({});
  });
});
