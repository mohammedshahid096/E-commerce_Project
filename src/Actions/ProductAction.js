import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
  ADMIN_PRODUCTLIST_REQUEST,
  ADMIN_PRODUCTLIST_SUCCESS,
  ADMIN_PRODUCTLIST_FAIL,
  ADMIN_NEW_PRODUCT_FAIL,
  ADMIN_NEW_PRODUCT_REQUEST,
  ADMIN_NEW_PRODUCT_SUCCESS,
  ADMIN_GET_CATEGORY_REQUEST,
  ADMIN_GET_CATEGORY_SUCCESS,
  ADMIN_GET_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_DELETE_CATEGORY_REQUEST,
  ADMIN_DELETE_CATEGORY_SUCCESS,
  ADMIN_DELETE_CATEGORY_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  FEATURE_PRODUCT_REQUEST,
  FEATURE_PRODUCT_SUCCESS,
  FEATURE_PRODUCT_FAIL,
} from "../Constraints/ProductConstant";
import { URLConstant } from "../Constraints/URLConstant";

// TODO: feature products
export const FeatureProducts = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: FEATURE_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`${url}feature`);

    dispatch({
      type: FEATURE_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: FEATURE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProducts =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 100000],
    category = "",
    ratingfilter = ""
  ) =>
  async (dispatch) => {
    const url = URLConstant;
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `${url}products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings= ${ratingfilter}`;
      // if (category) {
      //   link = `${url}products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      // }
      // console.log(link);
      const { data } = await axios.get(link);
      // console.log(data);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO: for getting a single product details
export const getProductDetails = (id) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${url}products/${id}`);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO: for submiting a reviews
export const newReviewSubmit = (reviewData) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`${url}review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ! ======================================
// !      admin purpose reducers
// ! ======================================

//TODO :  for getting all the products
export const AdminGetProducts = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ADMIN_PRODUCTLIST_REQUEST,
    });
    const { data } = await axios.get(`${url}admin/products`);

    dispatch({
      type: ADMIN_PRODUCTLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for  creating a new product
export const CreateNewProduct = (ProductDetails) => async (dispatch) => {
  const url = URLConstant;

  try {
    dispatch({
      type: ADMIN_NEW_PRODUCT_REQUEST,
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${url}admin/products/addproduct`,
      ProductDetails,
      config
    );

    dispatch({
      type: ADMIN_NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : For deleting a product
export const DeleteProduct = (productID) => async (dispatch) => {
  const url = URLConstant;

  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`${url}admin/products/${productID}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : For Editing a product
export const EditProduct = (productID, Data) => async (dispatch) => {
  const url = URLConstant;

  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `${url}admin/products/${productID}`,
      Data,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for  getting  all categories
export const GetAllCategories = () => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ADMIN_GET_CATEGORY_REQUEST,
    });

    const { data } = await axios.get(`${url}admin/category/all`);

    dispatch({
      type: ADMIN_GET_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for  creating a new category
export const createCategory = (categoryData) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ADMIN_CREATE_CATEGORY_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${url}admin/category/add`,
      categoryData,
      config
    );

    dispatch({
      type: ADMIN_CREATE_CATEGORY_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for  creating a new category
export const deleteCategory = (categoryId) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({
      type: ADMIN_DELETE_CATEGORY_REQUEST,
    });

    const { data } = await axios.delete(`${url}admin/category/${categoryId}`);

    dispatch({
      type: ADMIN_DELETE_CATEGORY_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : for getting all the reviews
export const getAllReviews = (id) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`${url}reviews?productid=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  const url = URLConstant;
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `${url}reviews?productid=${productId}&id=${reviewId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
