const express = require("express");
const {
  signUp,
  signIn,
  sendWeaknessStrengthLearningPreference,
  updateLearningPath,
} = require("../controllers/UserControllers"); // Import the signUp function
const authMiddleware = require("../middleware/middleware");
const router = express.Router();

// Sign up a new student
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post(
  "/sendWeaknessStrengthLearningPreference/:userId",

  sendWeaknessStrengthLearningPreference
);
router.patch("/learning-path/:userId", updateLearningPath); // New route for updating learning path

module.exports = router;
