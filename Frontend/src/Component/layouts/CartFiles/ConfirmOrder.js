import React from "react";
import MetaData from "../MetaData";
import CheckOutStepProces from "./CheckOutStepProces";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./confirmorder.css";

const ConfirmOrder = () => {
  const { cartItems, shippingDetails } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const productTotal = cartItems.reduce(
    (acc, val) => acc + val.quantity * val.price,
    0
  );

  //   TODO: if total is greater than 1000 then free shipping
  const shippingCharge = productTotal > 1000 ? 0 : 200;

  //   TODO: tax for 18%
  const tax = productTotal * 0.18;

  //   TODO: gross total of total + shipping + tax
  const grossTotal = productTotal + shippingCharge + tax;

  const procedTOPayment = () => {
    const data = {
      productTotal,
      shippingCharge,
      tax,
      grossTotal,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/order/paymentoptions");
  };
  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckOutStepProces processStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingDetails.phoneDetail}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {shippingDetails.addressDetail}, {shippingDetails.cityDetail},
                  {shippingDetails.stateDetail}, {shippingDetails.pincodeDetail}
                  ,{shippingDetails.countryDetail}
                </span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt={item.name} />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹ {productTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹ {shippingCharge}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹ {tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹ {grossTotal}</span>
            </div>

            <button onClick={procedTOPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
