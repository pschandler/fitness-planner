const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

module.exports = function () {
  //logging
  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "info" })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: config.get("mongo.connectionString"),
      level: "error",
    })
  );

  //exception handling
  winston.exceptions.handle(
    new winston.transports.File({
      filename: "unhandledExceptions.log",
      level: "error",
    }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
