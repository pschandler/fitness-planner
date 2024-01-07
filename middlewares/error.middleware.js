const winston = require("winston");

module.exports = function (err, req, res, next) {
  // log error
  winston.error(err.message, err);
  res.status(500).send("An unexpected error has occurred.");
};
