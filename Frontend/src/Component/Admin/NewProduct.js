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
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CreateNewProduct,
  GetAllCategories,
  clearErrors,
  createCategory,
  deleteCategory,
} from "../../Actions/ProductAction";
import {
  ADMIN_CREATE_CATEGORY_RESET,
  ADMIN_NEW_PRODUCT_RESET,
} from "../../Constraints/ProductConstant";

const NewProduct = () => {
  const dispatch = useDispatch();
  const {
    loading,
    categories,
    success,
    message,
    error: CategoryError,
  } = useSelector((state) => state.Category);
  const {
    Psuccess,
    Ploading,
    error: Perror,
  } = useSelector((state) => state.newProduct);

  const [categoryDailog, setcategoryDailog] = useState(false);
  const [categoryDeleteDailog, setcategoryDeleteDailog] = useState(false);
  const [categoryTitle, setcategoryTitle] = useState(null);
  const [p_images, setp_images] = useState([]);
  const [createProduct, setcreateProduct] = useState({
    p_name: "",
    p_price: "",
    p_description: "",
    p_category: "",
    p_stock: "",
  });

  const submitcategoryToggle = () => {
    categoryDailog ? setcategoryDailog(false) : setcategoryDailog(true);
  };

  const DeletecategoryToggle = () => {
    categoryDeleteDailog
      ? setcategoryDeleteDailog(false)
      : setcategoryDeleteDailog(true);
  };

  const SubmitCategoryHandler = () => {
    const formData = new FormData();
    formData.append("category", categoryTitle);
    dispatch(createCategory(formData));
    submitcategoryToggle();
  };

  const DeleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
    DeletecategoryToggle();
    GetAllCategories();
  };

  const Product_ChangeHandler = (e) => {
    setcreateProduct({ ...createProduct, [e.target.name]: e.target.value });
  };
  const p_imageHandler = (e) => {
    setp_images([...e.target.files]);
  };
  const productSubmitHandler = () => {
    const myForm = new FormData();

    myForm.append("name", createProduct.p_name);
    myForm.append("price", createProduct.p_price);
    myForm.append("description", createProduct.p_description);
    myForm.append("category", createProduct.p_category);
    myForm.append("stock", createProduct.p_stock);
    p_images.forEach((item) => {
      myForm.append("productImages", item);
    });

    dispatch(CreateNewProduct(myForm));
  };
  useEffect(() => {
    if (success) {
      ToastSuccess(message);
      dispatch({ type: ADMIN_CREATE_CATEGORY_RESET });
    }
    if (CategoryError) {
      ToastError(CategoryError);
    }
    if (Psuccess) {
      ToastSuccess("product created successfully");
      dispatch({ type: ADMIN_NEW_PRODUCT_RESET });
    }
    if (Perror) {
      ToastError(Perror);
      clearErrors();
    }

    dispatch(GetAllCategories());
  }, [dispatch, success, message, CategoryError, Psuccess, Perror]);

  return (
    <>
      <MetaData title={"Create Product"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading || Ploading ? (
            <Loader />
          ) : (
            <>
              <div className="options">
                <div
                  className="addCategory"
                  onClick={() => setcategoryDailog(true)}
                >
                  <AddBusinessIcon />
                  <p>Category</p>
                </div>
                <div
                  className="addCategory"
                  onClick={() => setcategoryDeleteDailog(true)}
                >
                  <DeleteForeverIcon />
                  <p>Category</p>
                </div>
              </div>

              <form className="createProductForm" encType="multipart/form-data">
                <h1>Create Product</h1>

                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="p_name"
                    onChange={Product_ChangeHandler}
                    required
                  />
                </div>
                <div>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    name="p_price"
                    onChange={Product_ChangeHandler}
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
                    onChange={Product_ChangeHandler}
                  ></textarea>
                </div>

                <div>
                  <AccountTreeIcon />
                  <select name="p_category" onChange={Product_ChangeHandler}>
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
                    onChange={Product_ChangeHandler}
                    required
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    multiple
                    onChange={p_imageHandler}
                  />
                </div>

                <div id="createProductFormImage">{p_images.length}</div>

                <Button
                  id="createProductBtn"
                  onClick={productSubmitHandler}
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>

              {/* ------------Add Category Dialog box------------------------------ */}
              <Dialog
                aria-labelledby="simeple-dialog-title"
                open={categoryDailog}
                onClose={submitcategoryToggle}
              >
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent className="submitDialog">
                  <input
                    type="text"
                    onChange={(e) => {
                      setcategoryTitle(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitcategoryToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    autoFocus
                    color="primary"
                    onClick={SubmitCategoryHandler}
                  >
                    {" "}
                    Create{" "}
                  </Button>
                </DialogActions>
              </Dialog>

              {/* ------------Delete Category Dialog box------------------------------ */}
              <Dialog
                aria-labelledby="simeple-dialog-title"
                open={categoryDeleteDailog}
                onClose={DeletecategoryToggle}
              >
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent className="DeleteDialog">
                  {categories &&
                    categories.map((item) => (
                      <div className="catDeleteList" key={item._id}>
                        <p>{item.categoryName}</p>
                        <Button onClick={() => DeleteCategoryHandler(item._id)}>
                          <DeleteIcon />
                        </Button>
                      </div>
                    ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={DeletecategoryToggle} color="secondary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NewProduct;
