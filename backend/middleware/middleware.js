const jwt = require("jsonwebtoken");
const User = require("../models/Student"); // Adjust the path if necessary

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a strong secret in production

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    // If no token is found, return an error
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user ID to the request object
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password from the user object

    // If user is not found, return an error
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
