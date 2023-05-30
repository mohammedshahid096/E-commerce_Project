import Category_Schema from "../Mongo_Models/CategorySchema.js";

//TODO : adding the new category
export const AddCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = new Category_Schema({ categoryName: category });
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: category + " is successfully added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//TODO getting all  category data
export const GetCategory = async (req, res) => {
  try {
    const categories = await Category_Schema.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//TODO: Delete the category
export const DeleteCategory = async (req, res) => {
  try {
    const category = await Category_Schema.findOne({
      _id: req.params.categoryID,
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }
    await Category_Schema.deleteOne({ _id: req.params.categoryID });
    res.status(200).json({
      success: true,
      message: "successfully deleted " + category.categoryName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
