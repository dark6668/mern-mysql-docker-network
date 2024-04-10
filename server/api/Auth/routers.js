const express = require("express");
const { Auth } = require("./controller");
const AuthControler = new Auth("Auth");
const router = express.Router();
const authHandler = require("../../middleware/authHandler");
router.post("/login", AuthControler.Login.bind(AuthControler));
router.post("/signup", AuthControler.SignUP.bind(AuthControler));
router.post(
  "/validate-token",
  authHandler,
  AuthControler.validateTokenBeforeLogin.bind(AuthControler),
);
router.get(
  "/getNewaAccessToken",
  AuthControler.GetNewAccessToken.bind(AuthControler),
);

module.exports = router;
