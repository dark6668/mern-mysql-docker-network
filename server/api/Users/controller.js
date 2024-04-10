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

  async getUser(req, res, errHandler) {
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
  async editUser(req, res, errHandler) {
    let {
      id = "",
      name = "",
      password = "",
      permissions = "",
    } = req.body.updateUser;
    let allEmpty = true;
    for (let key in req.body.updateUser) {
      if (req.body.updateUser[key] !== "") {
        allEmpty = false;
        break;
      }
    }

    if (allEmpty) {
      errHandler({ message: "All values are empty", status: 400 });
      return;
    }

    if (password.length > 0) {
      password = bcrypt.hashSync(password, 10);
    }

    const values = Object.entries({ id, name, password, permissions }).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          key === "permissions"
            ? value !== ""
              ? JSON.stringify(value.split(",")).trim()
              : "[]"
            : value,
      }),
      {},
    );
    super
      .updateItem(id, values)
      .then(() => {
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
      errHandler(error);
    }
  }
}

module.exports = {
  Users,
};
