const { CRUD } = require("../CRUD");
const bcrypt = require("bcrypt");
// TODO add a token specify for admin and

class Users extends CRUD {
  constructor() {
    super("users");
  }

  async getUsers(req, res, errHandler) {
    super
      .getAllData()
      .then((result) => {
        const users = result.map(({ password, ...rest }) => rest);

        res.status(200).send(users);
      })
      .catch((err) => {
        errHandler(err);
      });
  }

  async editUser(req, res, errHandler) {
    let {
      id = "",
      name = "",
      password = "",
      permissions = [],
    } = req.body.updateUser;
    if ([id, name, password, ...permissions].every((value) => value === "")) {
      errHandler("All values are empty");
    }
    if (password.length > 0) {
      password = bcrypt.hashSync(password, 10);
    }

    const values = Object.entries({ id, name, password, permissions })
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    super
      .updateItem(values)
      .then((result) => {
        res.status(200).send({ edit: "true" });
      })
      .catch((err) => {
        errHandler(err);
      });
  }

  async deleteUser(req, res, errHandler) {
    const userId = req.params.userId;
    super
      .deleteItemByKey("id", userId)
      .then(() => {
        res.status(200).send({ delete: true });
      })
      .catch((err) => {
        errHandler(err);
      });
  }

  async addUser(req, res, errHandler) {
    try {
      const { name, password, permissions } = req.body.newUser;
      const hashPassword = bcrypt.hashSync(password, 10);
      const column = ["name", "password", "permissions"];
      const values = [
        `'${name}', '${hashPassword}', ${permissions.length === 0 ? "JSON_ARRAY()" : `JSON_ARRAY('${permissions.join("','")}')`}`,
      ];

      super
        .insertToTables(column, values)
        .then(() => {
          res.status(200).send({ response: true });
        })
        .catch((error) => {
          errHandler(error);
        });
    } catch (error) {
      errHandler(err);
    }
  }
}

module.exports = {
  Users,
};
