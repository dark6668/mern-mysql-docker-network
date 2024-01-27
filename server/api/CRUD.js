const createDatabaseConnection = require("../db");

class CRUD {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }
  async getAllData() {
    try {
      const db = await createDatabaseConnection();
      const SELECT_QUERY = `SELECT1* FROM ${this.collectionName}`;
      const result = await new Promise((resolve, reject) => {
        db.query(SELECT_QUERY, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async addToTables(column, VALUES) {
    try {
      const db = await createDatabaseConnection();

      const INSERT_QUERY = `INSERT INTO ${this.collectionName} (${column.join(
        ", ",
      )}) VALUES (${VALUES.join(", ")})`;
      return new Promise((resolve, reject) => {
        db.query(INSERT_QUERY, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }).then((result) => {
        return true;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getItemByID(column, id) {
    try {
      const db = await createDatabaseConnection();

      const SELECT_QUERY = `SELECT ${column}
		FROM  ${this.collectionName}
		WHERE id=${id};`;

      return new Promise((resolve, reject) => {
        db.query(SELECT_QUERY, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      }).then((result) => {
        return result;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateItem(id, key, value) {
    try {
      const db = await createDatabaseConnection();

      const UPDATE_QUERY = `UPDATE ${this.collectionName}
		SET ${key} = '${value}'
		WHERE id =${id}`;

      return new Promise((resolve, reject) => {
        db.query(UPDATE_QUERY, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      }).then((result) => {
        return result;
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = {
  CRUD,
};
