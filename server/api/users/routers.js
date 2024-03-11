const express = require("express");
const { Users } = require("./controller");
const usersCrudControler = new Users("users");
const router = express.Router();

router.get("/getUsers", usersCrudControler.getUsers.bind(usersCrudControler));
router.delete(
  "/deleteUser/:userId",
  usersCrudControler.deleteUser.bind(usersCrudControler),
);
router.put("/editUser", usersCrudControler.editUser.bind(usersCrudControler));
router.post("/addUser", usersCrudControler.addUser.bind(usersCrudControler));

module.exports = router;
