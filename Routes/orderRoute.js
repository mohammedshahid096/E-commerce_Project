import express from "express";
import IsAuthenticated, { AurthorizeRole } from "../Config/IsAuthenticated.js";
import {
  AllMyOrdersLogin,
  deleteOrders,
  getAllOrder_Admin,
  getSingleOrder,
  newOrder,
  updateOrderStatus,
} from "../Controllers/OrderController.js";

const orderrouter = express.Router();

// user related orders
orderrouter.route("/addnew").post(IsAuthenticated, newOrder);
orderrouter.route("/myorders").get(IsAuthenticated, AllMyOrdersLogin);
orderrouter.route("/:orderid").get(IsAuthenticated, getSingleOrder);

// Admin
orderrouter
  .route("/admin/orders")
  .get(IsAuthenticated, AurthorizeRole, getAllOrder_Admin);
orderrouter
  .route("/admin/:orderid")
  .put(IsAuthenticated, AurthorizeRole, updateOrderStatus)
  .delete(IsAuthenticated, AurthorizeRole, deleteOrders);

export default orderrouter;
