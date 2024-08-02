const express = require("express");
const router = express.Router();
const getUsersList = require("../controllers/Admin/UsersList");
const {
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Admin/Category");
const { protect, isAdmin } = require("../middleware/authMiddleware");

//users List routes
router.get("/UsersList", protect, isAdmin, getUsersList);

//category routes
router.post("/addCategory", protect, isAdmin, addCategory);
router.post("/updateCategory/:id", protect, isAdmin, updateCategory);
router.delete("/deleteCategory/:id", protect, isAdmin, deleteCategory);

module.exports = router;
