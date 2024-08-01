const express = require("express");
const router = express.Router();
const getUsersList = require("../controllers/Admin/UsersList");
const { protect, isAdmin } = require("../middleware/authMiddleware");

//get users List
router.get("/UsersList", protect, isAdmin, getUsersList);

module.exports = router;
