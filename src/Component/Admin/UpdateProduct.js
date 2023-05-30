import React, { useState, useEffect } from "react";
import "./NewProduct.css";
import { Button } from "@mui/material";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import { ToastError, ToastSuccess } from "../Alert-POP's/Alertpop";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import {
  EditProduct,
  GetAllCategories,
  clearErrors,
  getProductDetails,
} from "../../Actions/ProductAction";
import { useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../Constraints/ProductConstant";

const UpdateProduct = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.Category);
  const { product, loading } = useSelector((state) => state.productDetails);
  const {
    error,
    isUpdated,
    loading: uload,
  } = useSelector((state) => state.EditProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  //   const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  //   const [imagesPreview, setImagesPreview] = useState([]);

  const updateSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    dispatch(EditProduct(productID, myForm));
  };

  useEffect(() => {
    dispatch(GetAllCategories());
    if (product && product._id !== productID) {
      dispatch(getProductDetails(productID));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.image);
    }

    if (isUpdated) {
      ToastSuccess("successfully updated");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getProductDetails(productID));
    }

    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, productID, product, error, isUpdated]);

  return (
    <>
      {" "}
      <MetaData title={"Create Product"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <form className="createProductForm" encType="multipart/form-data">
                <h1>Update Product</h1>

                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="p_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    name="p_price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <DescriptionIcon />

                  <textarea
                    placeholder="Product Description"
                    cols="30"
                    rows="1"
                    name="p_description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <AccountTreeIcon />
                  <select
                    name="p_category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories &&
                      categories.map((item) => (
                        <option key={item._id} value={item.categoryName}>
                          {item.categoryName}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <StorageIcon />
                  <input
                    type="number"
                    placeholder="Stock"
                    name="p_stock"
                    value={Stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>

                <div id="createProductFormFile">
                  <input type="file" name="avatar" accept="image/*" multiple />
                </div>

                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((item, index) => (
                      <img src={item.url} key={index} alt="Product" />
                    ))}
                </div>

                <Button
                  id="createProductBtn"
                  onClick={updateSubmitHandler}
                  disabled={uload ? true : false}
                >
                  Update
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
