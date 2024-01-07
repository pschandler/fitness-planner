const express = require("express");
const workouts = require("../routes/workout.routes");
const users = require("../routes/user.routes");
const auth = require("../routes/auth.routes");
const error = require("../middlewares/error.middleware");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/workouts", workouts);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
