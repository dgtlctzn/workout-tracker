const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
}, { toJSON: { virtuals: true } });

// adds values for the exercise duration
WorkoutSchema.virtual("totalDuration").get(function() {
  let total = 0;
  for (const item of this.exercises) {
    total += item.duration;
  }
  return total;
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
