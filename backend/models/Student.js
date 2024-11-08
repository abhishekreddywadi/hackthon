// backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  strengths: [String],
  weaknesses: [String],
  learningPath: [String],
  preferences: { type: String, enum: ["visual", "auditory", "self reading"] },
});

module.exports = mongoose.model("Student", studentSchema);
