const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/User/Category");
const { getProducts } = require("../controllers/User/Product");

router.get("/categories", getCategories);
router.get("/products", getProducts);

module.exports = router;
