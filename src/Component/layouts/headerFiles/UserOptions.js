import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastSuccess } from "../../Alert-POP's/Alertpop";
import Backdrop from "@mui/material/Backdrop";
import "./useroptions.css";

export const UserOptions = (props) => {
  const { userDetails } = props;
  const disptach = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [Open, setOpen] = useState(false);
  const SpeedDailDashboradIcons = [
    { icon: <ListAltIcon />, name: "Orders", fun: OrdersFunc },
    { icon: <PersonIcon />, name: "Profile", fun: ProfileFunc },
    {
      icon: (
        <AddShoppingCartIcon
          style={{ color: cartItems.length === 0 ? "unset" : "tomato" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      fun: CartFunc,
    },
    { icon: <ExitToAppIcon />, name: "Logout", fun: LogoutFunc },
  ];
  if (userDetails.role === "admin") {
    SpeedDailDashboradIcons.unshift({
      icon: <DashboardIcon />,
      name: "Dashborad",
      fun: DashboradFunc,
    });
  }
  const navigate = useNavigate();
  function OrdersFunc() {
    navigate("/orders");
  }
  function ProfileFunc() {
    navigate("/account");
  }
  function CartFunc() {
    navigate("/cart");
  }

  function DashboradFunc() {
    navigate("/admin/dashboard");
  }

  function LogoutFunc() {
    disptach(Logout());
    ToastSuccess("success fully logout");
  }

  return (
    <>
      <Backdrop open={Open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        icon={
          <img
            src={userDetails.profile.url}
            className="speedDialIcon"
            alt="profile"
          />
        }
        direction="down"
        open={Open}
        color="warning"
        className="SpeedDial"
        style={{ zIndex: 10 }}
      >
        {SpeedDailDashboradIcons.map((item) => {
          return (
            <SpeedDialAction
              icon={item.icon}
              tooltipTitle={item.name}
              key={item.name}
              onClick={item.fun}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </>
  );
};
