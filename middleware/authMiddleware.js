const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && // Authorization: Bearer <your_jwt_token>
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Split the Bearer token

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "saketh"); // Use environment variable for JWT secret

      // After decoding
      req.user = decoded; // this is the object we passed during sign of JWT

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // Fetch the user using the ID from req.user (assuming req.user is set by an authentication middleware)
    const admin = await User.findById(req.user.id);

    // Check if the user was found
    if (!admin) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user has an admin role
    if (admin.role === "admin") {
      return next(); // Proceed to the next middleware/handler
    } else {
      return res.status(403).send({ message: "Access denied. Admins only" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = { protect, isAdmin };
