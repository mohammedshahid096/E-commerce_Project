import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { Comp } = props;
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    navigate("/login");
  }
  if (props.isAdmin && user && user.role !== "admin") {
    navigate("/login");
  }

  return <>{!loading && isAuthenticated && <Comp />}</>;
};

export default ProtectedRoute;
