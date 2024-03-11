const { CRUD } = require("../CRUD");
const bcrypt = require("bcrypt");

class Auth extends CRUD {
  constructor() {
    super("users");
  }

  async Login(req, res, errHandler) {
    try {
      const { name, password } = req.body.UserData;
      super
        .getAllData()
        .then(async (result) => {
          let isUserExist = result.filter((item) => {
            return (
              item.name === name && bcrypt.compareSync(password, item.password)
            );
          });
          if (isUserExist.length === 0) {
            return res.status(401).send({
              err: "Sorry, the user could not be found. Please check the username or consider creating a new account if you haven't already.",
            });
          }
          delete isUserExist[0].password;
          super.getTokens(isUserExist[0]).then((tokens) => {
            isUserExist[0] = {
              ...isUserExist[0],
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            };
            res.status(200).send(isUserExist);
          });
        })
        .catch((err) => {
          errHandler(err);
        });
    } catch (error) {
      errHandler(err);
    }
  }

  async SignUP(req, res, errHandler) {
    try {
      const { name, password } = req.body.UserData;
      const hashPassword = bcrypt.hashSync(password, 10);
      const column = ["name", "password", "permissions"];
      const values = [`'${name}', '${hashPassword}', JSON_ARRAY()`];
      super
        .insertToTables(column, values)
        .then(() => {
          res.status(200).send({ sadsa: "Wrqwewq" });
        })
        .catch((error) => {
          errHandler(error);
        });
    } catch (error) {
      errHandler(err);
    }
  }

  async GetNewAccessToken(req, res, errHandler) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        res.status(401).send({ error: "Unauthorized" });
        return;
      }
      const refreshToken = authorizationHeader.split(" ")[1];
      super
        .getAccessToken(refreshToken)
        .then((accessToken) => {
          res.status(200).send({ accessToken });
        })
        .catch((err) => {
          errHandler(err);
        });
    } catch (error) {
      errHandler(err);
    }
  }

  validateTokenBeforeLogin(req, res, errHandler) {
    try {
      const userdata = req.body.userdata;
      super
        .getItemByKey("id", userdata.id)
        .then((user) => {
          user = user.map(({ password, ...rest }) => rest);
          res.status(200).send({ user });
        })
        .catch((err) => {
          errHandler(err);
        });
    } catch (error) {
      errHandler(error);
    }
  }
}

module.exports = {
  Auth,
};
