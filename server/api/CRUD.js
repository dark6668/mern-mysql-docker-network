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
      console.log(column);
      console.log(VALUES);
      const db = await createDatabaseConnection();

      const INSERT_QUERY = `INSERT INTO ${this.collectionName} (${column.join(
        ", ",
      )}) VALUES (${VALUES.join(", ")})`;
      console.log(INSERT_QUERY);
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
}

function generateAccessToken(user) {
  return jwt.sign({ user }, secretAccessToken, { expiresIn: "10m" });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, secretRefreshToken);
  // return jwt.sign({email},secretrefReshToken,{expiresIn: '15s'})
}

module.exports = {
  CRUD,
};
