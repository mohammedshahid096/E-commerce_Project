import React, { useState, useEffect } from "react";
import "./paymentoptions.css";
import MetaData from "../MetaData";
import CheckOutStepProces from "./CheckOutStepProces";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastError } from "../../Alert-POP's/Alertpop";
import { createOrder, clearErrorOrders } from "../../../Actions/OrderAction";
import { v4 as uuidv4 } from "uuid";

const PaymentOptions = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [value, setValue] = useState("mywallet");

  const { shippingDetails, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const disptach = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const orderPlacing = {
    itemsPrice: orderInfo.productTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.grossTotal,
    shippingInfo: shippingDetails,
    orderItems: cartItems,
  };
  const paymentConfirmButton = (x) => {
    let message;
    if (x === 1) {
      message = { status: "successed", mode: "mywallet" };
      const amount = user.wallet - orderPlacing.totalPrice;
      if (user.wallet <= amount) {
        ToastError("insuffient Balance");
        return;
      }
      orderPlacing.wallet = true;
    } else if (x === 2) {
      message = { status: "cash on delivery", mode: "cash" };
    }
    orderPlacing.paymentInfo = {
      id: uuidv4(),
      ...message,
    };
    disptach(createOrder(orderPlacing));
    navigate("/success");
  };
  const display = () => {
    if (value === "mywallet") {
      return (
        <>
          <div>
            <h3>Your Wallet Balance</h3>
            <br />
            <h4>
              {" "}
              <b>{user && user.wallet} ₹</b> <br />
              <br />
            </h4>
          </div>
          <button
            className="paymentFormBtn"
            onClick={() => paymentConfirmButton(1)}
          >{`Pay -${orderInfo.grossTotal} ₹`}</button>
        </>
      );
    } else if (value === "card")
      return (
        <>
          <div className="paymentContainer">
            <form className="paymentForm">
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <input type="text" className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <input type="text" className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <input type="text" className="paymentInput" />
              </div>

              <input
                type="submit"
                value={`Pay -${orderInfo.grossTotal} ₹`}
                className="paymentFormBtn"
              />
            </form>
          </div>
        </>
      );
    else if (value === "cash") {
      return (
        <>
          <div>
            <button
              className="paymentFormBtn"
              onClick={() => paymentConfirmButton(2)}
            >
              {" "}
              Confirm and Continue{" "}
            </button>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    if (error) {
      ToastError("something went wrong");
      disptach(clearErrorOrders());
    }
  }, [error, disptach]);
  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckOutStepProces processStep={2} />

      <div className="paymentPage">
        <div className="amountpayHeading">
          <p>Your Amount</p>
          <p>
            {" "}
            <b>₹</b> {orderInfo.grossTotal}
          </p>
        </div>

        <div>
          <h1>payment information</h1>
          <span>
            All Transactions are secure and encrypted. Credit Card information
            is never stored on our servers{" "}
          </span>
        </div>

        <div className="paymentOptions">
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="mywallet"
              control={<Radio />}
              label="My Wallet Cash"
              className="bottomborder"
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
              className="bottomborder"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit Card"
              className="bottomborder"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="paypal"
              className="bottomborder"
              style={{ border: "none" }}
            />
          </RadioGroup>
        </div>
        <div className="showModes">{display()}</div>
      </div>
    </>
  );
};

export default PaymentOptions;
