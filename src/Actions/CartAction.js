import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_DETAILS,
} from "../Constraints/CartConstant";
import { URLConstant } from "../Constraints/URLConstant";
import axios from "axios";

// TODO: Add to cart Action
export const addItemsCart =
  (productID, quantity) => async (disptach, getState) => {
    const url = URLConstant;
    try {
      let ProductData = await axios.get(`${url}products/${productID}`);
      ProductData = ProductData.data.product;
      disptach({
        type: ADD_TO_CART,
        payload: {
          product: ProductData._id,
          name: ProductData.name,
          price: ProductData.price,
          stock: ProductData.stock,
          image: ProductData.image[0].url,
          quantity,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };

// TODO: Remove  from Cart action function
export const removefromCart = (productID) => async (disptach, getState) => {
  disptach({
    type: REMOVE_FROM_CART,
    payload: productID,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// TODO: shipping Details action Function
export const saveShippingDetails = (s_data) => async (disptach, getState) => {
  disptach({
    type: SAVE_SHIPPING_DETAILS,
    payload: s_data,
  });
  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(getState().cart.shippingDetails)
  );
};
