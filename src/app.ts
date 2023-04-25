import "reflect-metadata";
import express from "express";
import { Express } from "express";
import router from "./router/router";
import errorHandler from "./others/middleware/errorHandler";
import bodyParser from "body-parser";
import morgan from "morgan";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

class App {
  private readonly app: Express;
  private readonly postgresDataSource: DataSource;

  public constructor(postgresDataSource: DataSource) {
    this.app = express();
    this.postgresDataSource = postgresDataSource;
  }

  public initialize = (): Express => {
    this.postgresDataSource
      .initialize()
      .then(() => {
        console.log("Database initialized successful");
      })
      .catch(() => {
        console.log("Database initialized fail");
      });
    this.app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
    this.app.use(bodyParser.json());
    this.app.use(router);
    this.app.use(errorHandler);
    return this.app;
  };
}

export default App;
