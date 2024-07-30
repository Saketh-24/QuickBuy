const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// POST
router.post("/register", register);

// login
router.post("/login", login);
module.exports = router;
