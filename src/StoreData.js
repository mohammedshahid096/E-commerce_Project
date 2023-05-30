import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductReducer,
  ProductDetailsReducer,
  NewReviewReducer,
  AllCategoriesReducer,
  EditProductReducer,
  CreateNewProductReducer,
  ProductReviewsReducer,
  EditreviewReducer,
  FeatureProductsReducer,
} from "./Reducers/ProductReducer";
import {
  AdminSingleUserReducer,
  AllUserReducer,
  ProfileReducer,
  UserReducer,
} from "./Reducers/UserReducer";
import { Cart_Reducer } from "./Reducers/CartReducer";
import {
  AllOrdersReducer,
  EditOrderReducer,
  MyOrdersReducer,
  OrdersDetailsReducer,
  newOrderReducer,
} from "./Reducers/OrderReducer";

const reducer = combineReducers({
  featureProducts: FeatureProductsReducer,
  products: ProductReducer,
  productDetails: ProductDetailsReducer,
  user: UserReducer,
  Profile: ProfileReducer,
  cart: Cart_Reducer,
  newOrder: newOrderReducer,
  myOrders: MyOrdersReducer,
  OrderDetails: OrdersDetailsReducer,
  newReview: NewReviewReducer,
  Category: AllCategoriesReducer,
  newProduct: CreateNewProductReducer,
  EditProduct: EditProductReducer,
  AllOrders: AllOrdersReducer,
  EditOrder: EditOrderReducer,
  AllUsers: AllUserReducer,
  SingleUserDetails: AdminSingleUserReducer,
  productReviews: ProductReviewsReducer,
  EditReview: EditreviewReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingDetails: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const StoreData = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default StoreData;
