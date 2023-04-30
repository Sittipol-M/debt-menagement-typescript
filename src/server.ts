import { Express } from "express";
import App from "./app";

new App().createServer().then((a) => {
  const app: Express = a;
  const port: number = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`This app is listening to port ${port}`);
  });
});
