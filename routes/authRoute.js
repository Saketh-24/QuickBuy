const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// POST
router.post("/register", register);

// login
router.post("/login", login);

//user protect check
router.get("/user-auth", protect, (req, res) => {
  res.status(200).send({ ok: true });
});

// admin protect check
router.get("/admin-auth", protect, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
