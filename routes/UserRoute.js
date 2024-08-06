const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/User/Category");
const { getProducts, getproductByID } = require("../controllers/User/Product");

router.get("/categories", getCategories);
router.get("/products", getProducts);
router.get("/product/:id", getproductByID);

module.exports = router;
