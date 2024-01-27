const { CRUD } = require("../CRUD");
// const bcrypt = require("bcrypt");

class Users extends CRUD {
  constructor() {
    super("users");
  }
  async getUser(req, res, errHandler) {
    super
      .getAllData()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        errHandler(err);
      });
  }
}

module.exports = {
  Users,
};
