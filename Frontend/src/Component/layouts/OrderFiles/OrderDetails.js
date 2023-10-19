import "./OrderDetails.css";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../LoadingFiles/Loader";
import { ToastError } from "../../Alert-POP's/Alertpop";
import {
  clearErrorOrders,
  getOrderDetails,
} from "../../../Actions/OrderAction";
import { Typography } from "@mui/material";

const OrderDetails = () => {
  const { orderid } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.OrderDetails);
  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrorOrders());
    }
    dispatch(getOrderDetails(orderid));
  }, [error, dispatch, orderid]);
  return (
    <>
      <MetaData title="order Detail's" />
      {loading ? (
        <Loader />
      ) : (
        order.shippingInfo && (
          <>
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">Order #{order._id}</Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order.shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                      {order.shippingInfo.state}, {order.shippingInfo.pinCode},{" "}
                      {order.shippingInfo.country}`
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo.status === "succeed"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo.status === "succeed"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                  <div>
                    <p>Payment Mode:</p>
                    <span>{order.paymentInfo && order.paymentInfo.mode}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
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
          </>
        )
      )}
    </>
  );
};

export default OrderDetails;
