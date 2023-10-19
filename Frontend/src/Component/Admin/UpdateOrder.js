import React, { useEffect, useState } from "react";
import "./UpdateOrder.css";
import { Button } from "@mui/material";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import { ToastError, ToastInfo, ToastSuccess } from "../Alert-POP's/Alertpop";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { clearErrorOrders, getOrderDetails } from "../../Actions/OrderAction";
import { useParams, Link } from "react-router-dom";
import {
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
} from "../../Constraints/orderConstant";
import { EditOrderProcess } from "../../Actions/OrderAction";

const NewProduct = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.OrderDetails);
  const {
    orderloading,
    isUpdated,
    error: orderError,
    isDeleted,
  } = useSelector((state) => state.EditOrder);

  const [ProcessHandler, setprocessHandler] = useState("");

  const processtSubmitHandler = () => {
    if (!ProcessHandler) {
      ToastInfo("pls select the Process Category");
      return;
    }
    const myForm = new FormData();

    myForm.append("status", ProcessHandler);
    dispatch(EditOrderProcess(orderID, myForm));
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrorOrders());
    }
    if (orderError) {
      ToastError(orderError);
      dispatch(clearErrorOrders());
    }
    if (isUpdated) {
      ToastSuccess("successfully updated the order");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (isDeleted) {
      ToastSuccess("successfully Deleted the order");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getOrderDetails(orderID));
  }, [dispatch, orderID, error, orderError, isDeleted, isUpdated]);

  return (
    <>
      <MetaData title={"order process"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <Sidebar />
            <div>
              <div className="newProductContainer" id="newclass">
                {order.user && (
                  <>
                    <div className="confirmOrderPage">
                      <div className="orderDetailsContainer">
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
                              {order.shippingInfo.address},{" "}
                              {order.shippingInfo.city},{" "}
                              {order.shippingInfo.state},{" "}
                              {order.shippingInfo.pinCode},{" "}
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
                            <span>
                              {order.paymentInfo && order.paymentInfo.mode}
                            </span>
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
                        <Button
                          id="createProductBtn"
                          onClick={processtSubmitHandler}
                          disabled={orderloading ? true : false}
                          style={{ backgroundColor: "brown" }}
                        >
                          Delete Order
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="createProductForm"
                    encType="multipart/form-data"
                  >
                    <h1> Update Process</h1>

                    <div>
                      <AccountTreeIcon />
                      <select
                        name="p_category"
                        onChange={(e) => setprocessHandler(e.target.value)}
                      >
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      onClick={processtSubmitHandler}
                      disabled={orderloading ? true : false}
                    >
                      Process the Order
                    </Button>
                  </form>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.user &&
                    order.orderItems.map((item) => (
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
          </div>
        </>
      )}
    </>
  );
};

export default NewProduct;
