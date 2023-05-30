import React, { useState, useEffect } from "react";
import "./userprofileupdate.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastError, ToastSuccess } from "../Alert-POP's/Alertpop";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import {
  Update_profile,
  successFullyUpdate,
  clearErrors,
  load_user,
} from "../../Actions/UserAction";

const UserProfileUpdate = () => {
  const dispatch = useDispatch();
  const { loading, updateUser, error } = useSelector((state) => state.Profile);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [updatedDetails, setupdatedDetails] = useState({
    name: "",
    email: "",
  });
  const [uploadProfile, setuploadProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setupdatedDetails({ name: user.name, email: user.email });
    }
    if (updateUser) {
      ToastSuccess("Profile Updated Successfully");
      dispatch(successFullyUpdate());
      dispatch(load_user());
      navigate("/account");
    }
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
  }, [user, error, updateUser, dispatch, navigate]);

  const onchangeUpdateProfile = (e) => {
    setupdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const UpdateFormData = new FormData();

    UpdateFormData.append("name", updatedDetails.name);
    UpdateFormData.append("email", updatedDetails.email);
    if (uploadProfile) {
      UpdateFormData.append("ProfileAvatar", updatedDetails.email);
    }
    dispatch(Update_profile(UpdateFormData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={updatedDetails.name}
                    onChange={onchangeUpdateProfile}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={updatedDetails.email}
                    onChange={onchangeUpdateProfile}
                  />
                </div>

                <div id="updateProfileImage">
                  <AccountCircleIcon />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => {
                      setuploadProfile(e.target.files[0]);
                    }}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfileUpdate;
