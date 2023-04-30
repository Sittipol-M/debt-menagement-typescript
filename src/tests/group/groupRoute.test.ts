import { Express } from "express";
import App from "../../app";
import request from "supertest";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import app from "../../app";

const defaultUrl = "/api/v1";

describe("POST /groups", () => {
  let app: Express;
  beforeAll(async () => {
    app = await new App().createServer();
  });
  test("Should return 200 and database add a record", async () => {
    // const res = await request(app).post(`${defaultUrl}/groups`);
    // expect(res.statusCode).toBe(200);
  });
});

describe("group route", () => {
  const defaultUrl = "/api/v1";
  let app: Express;
  beforeAll(async () => {
    app = await new App().createServer();
  });
  test("GET /groups", async () => {
    // const res = await request(app).get(`${defaultUrl}/groups`).send({ name: "testGroup1" });
    // console.log(res.body);
    // expect(res.statusCode).toBe(200);
  });
});
