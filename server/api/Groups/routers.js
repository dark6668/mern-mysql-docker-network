const express = require("express");
const { Groups } = require("./controller");
const GroupsControler = new Groups("Groups");
const router = express.Router();
router.get(
  "/getGroups/:userId",
  GroupsControler.getGroups.bind(GroupsControler),
);

module.exports = router;
