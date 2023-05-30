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
  NEW_REVIEW_RESET,
  ADMIN_PRODUCTLIST_REQUEST,
  ADMIN_PRODUCTLIST_SUCCESS,
  ADMIN_PRODUCTLIST_FAIL,
  CLEAR_ERRORS,
  ADMIN_NEW_PRODUCT_REQUEST,
  ADMIN_NEW_PRODUCT_SUCCESS,
  ADMIN_NEW_PRODUCT_FAIL,
  ADMIN_NEW_PRODUCT_RESET,
  ADMIN_GET_CATEGORY_REQUEST,
  ADMIN_GET_CATEGORY_SUCCESS,
  ADMIN_GET_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_CREATE_CATEGORY_RESET,
  ADMIN_DELETE_CATEGORY_REQUEST,
  ADMIN_DELETE_CATEGORY_SUCCESS,
  ADMIN_DELETE_CATEGORY_FAIL,
  ADMIN_DELETE_CATEGORY_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  FEATURE_PRODUCT_REQUEST,
  FEATURE_PRODUCT_SUCCESS,
  FEATURE_PRODUCT_FAIL,
} from "../Constraints/ProductConstant";

// TODO: feature products
export const FeatureProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATURE_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case FEATURE_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case FEATURE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const ProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCTLIST_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.totalProducts,
        pagePerProducts: action.payload.pagePerCount,
        currentProductCount: action.payload.currentProductCount,
        filterTotalProducts: action.payload.FilterCount,
      };
    case ADMIN_PRODUCTLIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.TotalProducts,
      };
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCTLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// TODO: product Detail  Reducer
export const ProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// TODO: for submiting a reviews  Reducer
export const NewReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// ! ======================================
// !      admin purpose reducers
// ! ======================================

// TODO : adding a new product
export const CreateNewProductReducer = (state = { NewProduct: {} }, action) => {
  switch (action.type) {
    case ADMIN_NEW_PRODUCT_REQUEST:
      return {
        ...state,
        Ploading: true,
      };
    case ADMIN_NEW_PRODUCT_SUCCESS:
      return {
        Ploading: false,
        Psuccess: action.payload.success,
        product: action.payload.product,
      };
    case ADMIN_NEW_PRODUCT_FAIL:
      return {
        ...state,
        Ploading: false,
        error: action.payload,
      };
    case ADMIN_NEW_PRODUCT_RESET:
      return {
        ...state,
        Psuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO: Product Editing related
export const EditProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO:  Category related Reducer
export const AllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_CATEGORY_REQUEST:
    case ADMIN_CREATE_CATEGORY_REQUEST:
    case ADMIN_DELETE_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ADMIN_GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ADMIN_CREATE_CATEGORY_SUCCESS:
    case ADMIN_DELETE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case ADMIN_GET_CATEGORY_FAIL:
    case ADMIN_CREATE_CATEGORY_FAIL:
    case ADMIN_DELETE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_CREATE_CATEGORY_RESET:
    case ADMIN_DELETE_CATEGORY_RESET:
      return {
        ...state,
        success: false,
        message: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO:  for getting all the reviews
export const ProductReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
        product: action.payload.productname,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const EditreviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
