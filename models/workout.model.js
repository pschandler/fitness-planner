const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Workout = mongoose.model(
  "Workout",
  new mongoose.Schema({
    name: String,
    description: String,
    workoutType: String,
    exercises: [Object],
    created: { type: Date, default: Date.now },
    accessed: { type: Date, default: Date.now },
    isPublished: Boolean,
  })
);

function validateWorkout(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    workoutType: Joi.string().required(),
  });
  const result = schema.validate(body);
  return result;
}

exports.Workout = Workout;
exports.validate = validateWorkout;
