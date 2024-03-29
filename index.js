const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/middlewares")(app);
require("./startup/production")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  winston.info(`app listening on port ${PORT}`);
});
