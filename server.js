const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const workoutController = require("./controllers/workoutController");
const htmlController = require("./controllers/htmlController");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connection success!");
})

connection.on("error", () => {
    console.log("mongoose error!")
})

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.use(workoutController);
app.use(htmlController);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
