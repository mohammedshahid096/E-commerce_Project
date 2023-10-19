import "./MyOrders.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../LoadingFiles/Loader";
import { ToastError } from "../../Alert-POP's/Alertpop";
import {
  clearErrorOrders,
  myOrdersActions,
} from "../../../Actions/OrderAction";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography } from "@mui/material";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "index", headerName: "S.no", minWidth: 50, flex: 0.4 },

    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    { field: "mode", headerName: "P.Mode", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        index: index + 1,
        itemsQty: item.orderItems.length,
        mode: item.paymentInfo.mode,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrorOrders());
    }

    dispatch(myOrdersActions());
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="my orders" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
            ></DataGrid>
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
