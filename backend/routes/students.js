const express = require("express");
const {
  signUp,
  signIn,
  sendWeaknessStrengthLearningPreference,
  updateLearningPath,
  updateScore,
  getAllUsersByScore,
  getScore,
  updateUserDetails,
  getUserDetails,
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
router.patch("/score/:userId", updateScore); // New route for updating score
router.get("/all-users", getAllUsersByScore); // New route for getting all users by score
router.get("/score/:userId", getScore); // New route for getting score
router.put("/user-details/:userId", updateUserDetails);
router.get("/user-details/:userId", getUserDetails); // New route for getting user details
module.exports = router;
