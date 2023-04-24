import * as express from "express";
import { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./others/database/data-source";
import router from "./router/router";
import errorHandler from "./others/middleware/errorHandler";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

console.log();
AppDataSource.initialize();
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`This app is listening to port ${port}`);
});
