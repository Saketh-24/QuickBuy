const Product = require("../../models/ProductModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, rating } = req.body;
    const image = req.file?.path;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !image ||
      !rating
    ) {
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
      rating,
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
    // Log incoming request
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    const { id } = req.params;
    const { name, description, price, category, quantity, rating } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required",
      });
    }

    // Prepare update fields
    const updateFields = {
      name,
      description,
      price,
      category,
      quantity,
      rating,
    };
    console.log("Update Fields:", updateFields);

    // Check if fields are present
    for (const key in updateFields) {
      if (updateFields[key] === undefined || updateFields[key] === null) {
        console.log(`Field ${key} is undefined or null`);
      }
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...updateFields },
      { new: true, runValidators: true }
    );

    // Check if product was found and updated
    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Updated Product:", updatedProduct);

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
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
