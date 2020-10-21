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
            message: "failed to get workout list"
        })
    })
])

module.exports = router;