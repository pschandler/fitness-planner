const express = require("express");
const router = express.Router();
const { Workout, validate } = require("../models/workout.model");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.get("/", async (req, res) => {
  const workouts = await Workout.find();
  res.send(workouts);
});

router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout)
    return res.status(404).send("The workout with the given ID was not found.");
  res.send(workout);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details);

  const workout = new Workout({
    name: req.body.name,
    description: req.body.description,
    workoutType: req.body.workoutType,
    exercises: req.body.exercises,
    isPublished: false,
  });
  await workout.save();
  res.send(workout);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const workout = await Workout.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      workoutType: req.body.workoutType,
      exercises: req.body.exercises,
      isPublished: false,
    },
    { new: true }
  );

  if (!workout)
    return res.status(404).send("The workout with the given ID was not found.");
  return res.send(workout);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);

  if (!workout)
    return res.status(404).send("The workout with the given ID was not found.");
  return res.send(workout);
});

module.exports = router;
