const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => [
    db.Workout.find().populate("Exercise").then(foundWorkouts => {
        res.json(foundWorkouts);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "failed to get workout list"
        })
    })
])

router.post("/api/workouts", (req, res) => [
    db.Workout.create(req.body).then(postedWorkout => {
        res.json(postedWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "failed to post workout"
        })
    })
])

module.exports = router;