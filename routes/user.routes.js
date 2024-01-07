const express = require("express");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details);

  let user = await User.findOne(_.pick(req.body, ["email"]));
  if (user) {
    return res.status(400).send("User already exists.");
  }

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

module.exports = router;
