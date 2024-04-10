async function errHandler(error, req, res, next) {
  console.log(error);
  res.status(error.status).send({ message: error.message });
}

module.exports = errHandler;
