const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/User/Category");

router.get("/categories", getCategories);

module.exports = router;
