import express from "express";
import IsAuthenticated, { AurthorizeRole } from "../Config/IsAuthenticated.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  DeleteProductReview,
  GetAllProductsAdmin,
  FeatureProducts,
} from "../Controllers/ProductController.js";
import {
  AddCategory,
  DeleteCategory,
  GetCategory,
} from "../Controllers/CategoryController.js";
import singlUpload, { multipleUpload } from "../Config/MulterUpload.js";

const Product = express.Router();

//normal user
Product.route("/products").get(getAllProducts);
Product.route("/products/:id").get(getSingleProduct);

// for feature
Product.route("/feature").get(FeatureProducts);
//reviews route for normal user
Product.route("/review").put(IsAuthenticated, createProductReview);

Product.route("/reviews").get(getProductReviews);

// admin will delete this reviews
Product.route("/reviews").delete(
  IsAuthenticated,
  AurthorizeRole,
  DeleteProductReview
);

//only admin users routes
Product.route("/admin/products").get(
  IsAuthenticated,
  AurthorizeRole,
  GetAllProductsAdmin
);
Product.route("/admin/products/addproduct").post(
  IsAuthenticated,
  AurthorizeRole,
  multipleUpload,
  createProduct
);
Product.route("/admin/products/:id")
  .put(IsAuthenticated, AurthorizeRole, updateProduct)
  .delete(IsAuthenticated, AurthorizeRole, deleteProduct);

Product.route("/admin/category/add").post(
  IsAuthenticated,
  AurthorizeRole,
  AddCategory
);
Product.route("/admin/category/all").get(GetCategory);
Product.route("/admin/category/:categoryID").delete(
  IsAuthenticated,
  AurthorizeRole,
  DeleteCategory
);

export default Product;
