const express = require("express");
const { Users } = require("./controller");
const usersCrudControler = new Users("users");
const router = express.Router();

router.get("/getUser", usersCrudControler.getUser.bind(usersCrudControler));

module.exports = router;
