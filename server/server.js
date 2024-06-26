const express = require("express");
const SERVER_PORT = process.env.SERVER_PORT;
const createDatabaseConnection = require("./db");
const errHandler = require("./middleware/errHandler");
const authHandler = require("./middleware/authHandler");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: process.env.REACT_APP_API_URL, credentials: true }));

const usersRouters = require("./api/Users/routers");
const AuthRouters = require("./api/Auth/routers");
const GroupsRouters = require("./api/Groups/routers");
app.use("/api/users", authHandler, usersRouters, errHandler);
app.use("/api/groups", authHandler, GroupsRouters, errHandler);

app.use("/api/auth", AuthRouters, errHandler);

app.listen(SERVER_PORT, async () => {
  createDatabaseConnection()
    .then(() => {
      console.log("Server started on port 3000 and Connected to the database ");
    })
    .catch((err) => {
      console.log(err);
      console.error("Server cannot start due to database connection failure");
      process.exit(1);
    });
});
