const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

module.exports = function () {
  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "error" }),
    new winston.transports.Console({
      level: "info",
      colorize: true,
      prettyPrint: true,
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: config.get("mongo.connectionString"),
      level: "error",
    })
  );

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

  console.log(config.get("name"));
  console.log(config.get("jwtPrivateKey"));
};
