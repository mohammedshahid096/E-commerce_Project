import express from "express";
import IsAuthenticated, { AurthorizeRole } from "../Config/IsAuthenticated.js";
import singlUpload from "../Config/MulterUpload.js";
import {
  LoginUser,
  Register,
  Logout,
  GetUserDetails,
  UpadateUser,
  GetAllUsers,
  GetSingleUser,
  UpadateUserAdmin,
  DeleteUserAdmin,
} from "../Controllers/UserController.js";

const user_route = express.Router();

user_route.route("/register").post(singlUpload, Register);
user_route.route("/login").post(LoginUser);
user_route.route("/logout").get(Logout);

user_route.route("/me").get(IsAuthenticated, GetUserDetails);
user_route.route("/me/update").put(IsAuthenticated, singlUpload, UpadateUser);

//admin routes
user_route
  .route("/admin/allusers")
  .get(IsAuthenticated, AurthorizeRole, GetAllUsers);
user_route
  .route("/admin/:id")
  .get(IsAuthenticated, AurthorizeRole, GetSingleUser)
  .put(IsAuthenticated, AurthorizeRole, UpadateUserAdmin)
  .delete(IsAuthenticated, AurthorizeRole, DeleteUserAdmin);

export default user_route;
