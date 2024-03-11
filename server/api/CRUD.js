const createDatabaseConnection = require("../db");
const jwt = require("jsonwebtoken");
const secretAccessToken = process.env.SECRET_ACCESS_TOKEN;
const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN;

let listOfRefreshToken = [];

class CRUD {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async getAllData() {
    try {
      const db = await createDatabaseConnection();
      const SELECT_QUERY = `SELECT* FROM ${this.collectionName}`;
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

  async insertToTables(column, VALUES) {
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

  async getItemByKey(key, value) {
    try {
      const db = await createDatabaseConnection();

      const SELECT_QUERY = `SELECT *
      FROM ${this.collectionName}
      WHERE ${key}='${value}';`;

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

  async updateItem(values) {
    try {
      const db = await createDatabaseConnection();

      const UPDATE_QUERY = `UPDATE ${this.collectionName} SET ${Object.entries(
        values,
      )
        .map(
          ([key, value]) =>
            `${key} = ${typeof value === "string" ? `'${value}'` : `'${JSON.stringify(value)}'`}`,
        )
        .join(", ")} WHERE id = ?`;

      await new Promise((resolve, reject) => {
        db.query(UPDATE_QUERY, [values.id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTokens(user) {
    return new Promise((resolve, reject) => {
      try {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        listOfRefreshToken.push(refreshToken);
        const tokens = { accessToken, refreshToken };
        resolve(tokens);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAccessToken(refreshToken) {
    return new Promise((resolve, reject) => {
      try {
        if (!listOfRefreshToken.includes(refreshToken)) {
          reject("Token doesn't exist");
          return;
        }
        jwt.verify(refreshToken, secretRefreshToken, (err, result) => {
          if (err) {
            const indexToRemove = listOfRefreshToken.indexOf(refreshToken);
            listOfRefreshToken.splice(indexToRemove, 1);
            reject("Token doesn't exist");
            return;
          }
          const accessToken = generateAccessToken(result.user);
          resolve(accessToken);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteItemByKey(key, value) {
    try {
      const db = await createDatabaseConnection();

      const DELETE_QUERY = ` DELETE FROM ${this.collectionName}   WHERE ${key}='${value}';`;
      return new Promise((resolve, reject) => {
        db.query(DELETE_QUERY, (err, result) => {
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

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, secretAccessToken, {
    expiresIn: "10m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, secretRefreshToken);
  // return jwt.sign({email},secretrefReshToken,{expiresIn: '15s'})
}

module.exports = {
  CRUD,
};
