import "reflect-metadata";
import express from "express";
import { Express } from "express";
import errorHandler from "./others/middleware/errorHandler";
import bodyParser from "body-parser";
import morgan from "morgan";
import { PostgresDataSource } from "./others/database/PostgresDataSource";
import dotenv from "dotenv";
import AllRoute from "./router/router";
import { DataSource } from "typeorm";

class App {
  private app: Express;
  constructor() {
    this.app = express();
  }

  public createServer = async (): Promise<Express> => {
    switch (process.env.NODE_ENV) {
      case "production":
        dotenv.config({ path: __dirname + "./../.env.prod" });
        break;
      case "development":
        dotenv.config({ path: __dirname + "./../.env.dev" });
        break;
      case "test":
        dotenv.config({ path: __dirname + "./../.env.test" });
        break;
    }

    const postgresDataSource = new PostgresDataSource(
      process.env.POSTGRES_HOST,
      Number(process.env.POSTGRES_PORT),
      process.env.POSTGRES_USERNAME,
      process.env.POSTGRES_PASSWORD,
      process.env.POSTGRES_DATABASE
    );

    await postgresDataSource.initialize();



    const allRouter = new AllRoute(postgresDataSource.getInstance()).getRouter();

    this.app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
    this.app.use(bodyParser.json());
    this.app.use(allRouter);
    this.app.use(errorHandler);
    return this.app;
  };
}

export default App;
