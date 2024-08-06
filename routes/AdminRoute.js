const express = require("express");
const router = express.Router();
const getUsersList = require("../controllers/Admin/UsersList");
const {
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Admin/Category");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Admin/Product");

//users List routes
router.get("/UsersList", protect, isAdmin, getUsersList);

//category routes
router.post("/addCategory", protect, isAdmin, addCategory);
router.post("/updateCategory/:id", protect, isAdmin, updateCategory);
router.delete("/deleteCategory/:id", protect, isAdmin, deleteCategory);

//product routes
router.post(
  "/addProduct",
  upload.single("productImage"),
  protect,
  isAdmin,
  addProduct
);
router.post(
  "/updateProduct/:id",
  upload.single("productImage"),
  protect,
  isAdmin,
  updateProduct
);
router.delete("/deleteProduct/:id", protect, isAdmin, deleteProduct);

module.exports = router;
