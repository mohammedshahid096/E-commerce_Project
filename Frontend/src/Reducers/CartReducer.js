import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_DETAILS,
} from "../Constraints/CartConstant";

export const Cart_Reducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const itemExist = state.cartItems.find(
        (val) => val.product === item.product
      );

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((val) => {
            if (val.product === itemExist.product) {
              return item;
            } else {
              return val;
            }
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      const Remove_item = action.payload;
      const AfterFilter = state.cartItems.filter(
        (obj) => obj.product !== Remove_item
      );
      return {
        ...state,
        cartItems: AfterFilter,
      };

    case SAVE_SHIPPING_DETAILS:
      return {
        ...state,
        shippingDetails: action.payload,
      };

    default:
      return state;
  }
};
