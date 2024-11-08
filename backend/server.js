// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/education-platform")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// backend/server.js (continued)
app.use("/api/students", studentRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
