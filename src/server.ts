import dotenv from "dotenv";

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

import App from "./app";
import { PostgresDataSource } from "./others/database/PostgresDataSource";

const app = new App(PostgresDataSource).initialize();

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`This app is listening to port ${port}`);
});
