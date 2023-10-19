import React from "react";
import "./cart.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CartSingleProduct from "./CartSingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { addItemsCart, removefromCart } from "../../../Actions/CartAction";
import { useNavigate } from "react-router-dom";

const CartList = () => {
  const disptach = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // TODO: gross total method
  const grossTotal = cartItems.reduce((acc, obj) => {
    return acc + obj.price * obj.quantity;
  }, 0);
  // if we use object array then we need to pass 0 as a second parameter

  // TODO: to increase the product quantity
  const increaseQuatity = (productID, quantity, stock) => {
    const newUpadateQuantiy = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    disptach(addItemsCart(productID, newUpadateQuantiy));
  };

  // TODO: to decrease the product quantity
  const decreaseQuantity = (productID, quantity) => {
    const newUpadateQuantiy = quantity - 1;
    if (quantity <= 1) {
      return;
    }

    disptach(addItemsCart(productID, newUpadateQuantiy));
  };

  // TODO: removing the item from the cart, it's a child to parent function
  const Delete = (productID) => {
    disptach(removefromCart(productID));
  };

  // TODO: check out function
  const CheckOutFunction = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      {cartItems.length !== 0 ? (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((val) => {
                return (
                  <div className="cartContainer" key={val.product}>
                    <CartSingleProduct item={val} deleteProduct={Delete} />
                    <div className="cartInput">
                      <button
                        onClick={() => {
                          decreaseQuantity(val.product, val.quantity);
                        }}
                      >
                        -
                      </button>
                      {/* <input readOnly type="number" value={1} /> */}
                      <span>{val.quantity}</span>
                      <button
                        onClick={() => {
                          increaseQuatity(val.product, val.quantity, val.stock);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`₹${
                      val.price * val.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>₹ {grossTotal}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={CheckOutFunction}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="emptyCart">
            <RemoveShoppingCartIcon />

            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        </>
      )}
    </>
  );
};

export default CartList;
