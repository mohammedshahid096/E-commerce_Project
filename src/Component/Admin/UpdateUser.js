import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import { ToastError, ToastSuccess } from "../Alert-POP's/Alertpop";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaidIcon from "@mui/icons-material/Paid";
import {
  AdminUserUpdate,
  GetSingleUser,
  clearErrors,
} from "../../Actions/UserAction";
import { useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../Constraints/UserConstant";

export const UpdateUser = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.SingleUserDetails
  );
  const {
    loading: uLoading,
    updateUser,
    error: uError,
  } = useSelector((state) => state.Profile);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [wallet, setwallet] = useState("");

  const userUpdateHandler = () => {
    const myform = new FormData();
    myform.append("name", name);
    myform.append("email", email);
    myform.append("role", role);
    myform.append("wallet", wallet);

    dispatch(AdminUserUpdate(userID, myform));
  };
  useEffect(() => {
    if (user && user._id !== userID) {
      dispatch(GetSingleUser(userID));
    } else {
      setname(user.name);
      setemail(user.email);
      setrole(user.role);
      setwallet(user.wallet);
    }
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
    if (updateUser) {
      ToastSuccess(updateUser);
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(GetSingleUser(userID));
    }
    if (uError) {
      ToastError(uError);
      dispatch(clearErrors());
    }
  }, [dispatch, userID, user, error, updateUser, uError]);
  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form className="createProductForm">
              <h1>Update User</h1>

              <div>{user.profile && <img src={user.profile.url} alt="" />}</div>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div>
                <PaidIcon />
                <input
                  type="number"
                  placeholder="wallet"
                  value={wallet}
                  onChange={(e) => setwallet(e.target.value)}
                  required
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setrole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                onClick={userUpdateHandler}
                disabled={uLoading ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
