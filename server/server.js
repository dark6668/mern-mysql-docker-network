const express = require("express");
const SERVER_PORT = process.env.SERVER_PORT;
const createDatabaseConnection = require("./db");
const errHandler = require("./middleware/errhandler");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send({ req: "good" });
});

const usersRouters = require("./api/users/routers");
app.use("/api/users", usersRouters, errHandler);
app.listen(SERVER_PORT, async () => {
  setTimeout(() => {
    createDatabaseConnection()
      .then(() => {
        console.log(
          "Server started on port 3000 and Connected to the database ",
        );
      })
      .catch((err) => {
        console.log(err);
        console.error("Server cannot start due to database connection failure");
        process.exit(1);
      });
  }, 1000);
});
