async function errHandler(error, req, res, next) {
  console.log(error);
  res.status(500).send({ err: "something went wrong" });
}

module.exports = errHandler;
