const Product = require("../../models/ProductModel");

const addProduct = async (req, res) => {
  try {
    const newProduct = Product;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something wrong on server side",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something wrong on server side",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something wrong on server side",
      error,
    });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };
