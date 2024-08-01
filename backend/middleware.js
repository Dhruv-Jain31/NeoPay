require('dotenv').config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  console.log("Request Headers:", req.headers); // Log all headers to debug

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Invalid auth header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log("Decoded token:", decoded); // Log decoded token for debugging

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({
        message: "Invalid auth header",
      });
    }
  } catch (err) {
    console.error("JWT verification error:", err.message); // Log error for debugging
    return res.status(403).json({
      message: "Invalid auth header in catch block",
    });
  }
};

module.exports = {
  authMiddleware,
};
