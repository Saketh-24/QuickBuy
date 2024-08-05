const Product = require("../../models/ProductModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    const image = req.file?.path;

    if (!name || !description || !price || !category || !quantity || !image) {
      return res.status(400).send({
        success: false,
        message: "All fields are required, including image",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image,
    });

    await newProduct.save();

    return res.status(201).send({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side",
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
