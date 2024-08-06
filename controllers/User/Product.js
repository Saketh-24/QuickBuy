const Product = require("../../models/ProductModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(15)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      productsCount: products.length,
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

const getproductByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send(400).send({
        success: false,
        message: "id not provided",
      });
    }
    const SingleProduct = await Product.findById(id).populate("category");
    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      SingleProduct,
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

module.exports = { getProducts, getproductByID };
