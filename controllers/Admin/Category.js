const Category = require("../../models/CategoryModel");

const addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category)
      return res.status(400).send({
        success: false,
        message: "please add valid category",
      });

    const exists = await Category.findOne({ category });
    if (exists)
      return res.status(400).send({
        success: true,
        message: "category already exists",
      });

    const newCategory = await Category.create({
      category,
    });
    if (newCategory)
      return res.status(200).send({
        success: true,
        message: "Category created successfully",
        newCategory,
      });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "something wrong on server side",
      error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const { id } = req.params;
    if (!id || !category)
      return res.status(400).send({
        success: false,
        message: "invalid request (id not found)",
      });
    const update = await Category.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "category updated",
      update,
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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).send({
        success: false,
        message: "invalid request (id not found)",
      });
    const deleted = await Category.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "category Deleted",
      deleted,
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

module.exports = { addCategory, updateCategory, deleteCategory };
