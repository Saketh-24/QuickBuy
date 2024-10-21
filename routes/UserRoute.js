const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/User/Category");
const {
  getProducts,
  getproductByID,
  TokenController,
  PaymentController,
  getOrders,
} = require("../controllers/User/Product");
const { protect } = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/User/UpdateProfile");

router.get("/categories", getCategories);
router.get("/products", getProducts);
router.get("/product/:id", getproductByID);
router.get("/orders", protect, getOrders);

router.get("/payment/token", TokenController);
router.post("/proceed/payment", protect, PaymentController);

router.put("/updateProfile", protect, updateProfile);

module.exports = router;
