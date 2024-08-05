const Product = require("../../models/ProductModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side",
      error,
    });
  }
};

module.exports = { getProducts };
