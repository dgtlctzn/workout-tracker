const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "failed to get workout list",
      });
    });
});

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((postedWorkout) => {
      res.json(postedWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "failed to post workout",
      });
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Exercise.create(req.body).then(exercise => {
//     console.log(exercise);
    console.log(req.body);
    db.Workout.updateOne({_id: req.params.id}, { $push: {exercises: exercise}})
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
      console.log(updatedWorkout)
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "failed to update workout",
      });
    });
  })
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find()
    .populate("exercises")
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "failed to get workout list",
      });
    });
});

module.exports = router;
