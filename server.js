import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import sequelize from "./data/db/connection";

import routes from "./api/routes/index";
import authorizationMiddleware from "./api/middlewares/authorization.middleware";
import errorHandlerMiddleware from "./api/middlewares/error-handler.middleware";
import routesWhiteList from "./config/routes-white-list.config";
import "./config/passport.config";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api/", authorizationMiddleware(routesWhiteList));

routes(app);

app.use(errorHandlerMiddleware);

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${process.env.APP_PORT}!`);
});
