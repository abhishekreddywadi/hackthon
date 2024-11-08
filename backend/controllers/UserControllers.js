// backend/controllers/userController.js
const User = require("../models/Student"); // Adjust the path if necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a strong secret in production

// Sign up a new user
const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    strengths,
    weaknesses,
    learningPath,
    preferences,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      strengths,
      weaknesses,
      learningPath,
      preferences,
    });

    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set the token in a cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   //   secure: process.env.NODE_ENV === "production",
    // });

    res.status(201).json({ message: "Sign up successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Sign in successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
};
const sendWeaknessStrengthLearningPreference = async (req, res) => {
  try {
    // Find the user by id
    const user = await User.findById(req.params.userId).select(
      "weaknesses strengths preferences"
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Send the user's weakness, strength, and learning preference to the front end
    res.status(200).json({
      weaknesses: user.weaknesses,
      strengths: user.strengths,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving weakness, strength, and learning preference",
      error,
    });
  }
};
const updateLearningPath = async (req, res) => {
  const { learningPath } = req.body; // Expecting an array of learning paths

  try {
    // Find the user by ID from the request object (set by authMiddleware)
    // const user = req.user;

    // Update the learningPath array
    // user.learningPath = learningPath; // Update the learningPath with the new array

    // await user.save(); // Save the updated user document
    // Take user id from param
    const userId = req.params.userId;
    // Save the updated learning path in the database
    await User.findByIdAndUpdate(userId, { learningPath: learningPath });

    res.status(200).json({
      message: "Learning path updated successfully",
      learningPath: learningPath,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating learning path", error });
  }
};

module.exports = {
  signUp,
  signIn,
  sendWeaknessStrengthLearningPreference,
  updateLearningPath,
};
