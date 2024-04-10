const jwt = require("jsonwebtoken");

const secretAccessToken = process.env.SECRET_ACCESS_TOKEN;

async function authHandler(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res.status(401).send({ message: "Unauthorized" });
  const accessToken = authorizationHeader.split(" ")[1];
  jwt.verify(accessToken, secretAccessToken, (err, user) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    req.body.userdata = user;
    next();
  });
}

module.exports = authHandler;
