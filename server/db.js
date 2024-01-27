const mysql = require("mysql2");
function createDatabaseConnection() {
  return new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: process.env.IPV4_DB,
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    db.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

module.exports = createDatabaseConnection;
