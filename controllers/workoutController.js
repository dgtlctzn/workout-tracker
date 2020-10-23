const express = require("express");
const router = express.Router();
const db = require("../models");

// retrieves all workouts
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

// adds a new workout to the db
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

// updates current workout (by _id) and adds exercise model to exercises array
router.put("/api/workouts/:id", (req, res) => {
  db.Exercise.create(req.body).then(exercise => {
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

// retrieves all workouts
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
