const morgan = require("morgan");
const debug = require("debug")("app:startup");
const config = require("config");

module.exports = function (app) {
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("morgan is here for you");
    debug("Environment: ", app.get("env"));
    debug("App Name: ", config.get("name"));
    debug("Mail Host: ", config.get("mail.host"));
  }
};
