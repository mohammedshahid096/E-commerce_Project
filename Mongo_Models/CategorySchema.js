import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const Schema_model = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const Category_Schema = mongoose.model("Category", Schema_model);

export default Category_Schema;
