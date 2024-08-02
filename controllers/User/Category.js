const Category = require("../../models/CategoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).send({
      success: true,
      message: "categories fetched successfully",
      categories,
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

module.exports = { getCategories };
