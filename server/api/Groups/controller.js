const { CRUD } = require("../CRUD");

class Groups extends CRUD {
  constructor() {
    super("`groups`");
  }
  async getGroups(req, res, errHandler) {
    const userId = req.params.userId;
    // const query = `SELECT \`groups\`.groupName, users.name  as userName
    // FROM \`groups\`
    // INNER JOIN users ON users.id = \`groups\`.userId
    // WHERE \`groups\`.managerId = ${userId};`;
    const query = `SELECT MIN(id) AS id, groupName, COUNT(userId) AS count_of_users
    FROM \`groups\`
    WHERE managerId = ${userId}
    GROUP BY groupName;`;
    super
      .customQuery(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        errHandler(err);
      });
  }
}

module.exports = {
  Groups,
};
