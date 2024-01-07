const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details);

  let user = await User.findOne(_.pick(req.body, ["email"]));
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  const token = user.generateAuthToken();
  return res.send(token);
});

function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  const result = schema.validate(req);
  return result;
}

module.exports = router;
