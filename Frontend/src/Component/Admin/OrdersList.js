import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import { ToastError, ToastSuccess } from "../Alert-POP's/Alertpop";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import {
  AdminAllOrders,
  AdminDeleteOrder,
  clearErrorOrders,
} from "../../Actions/OrderAction";
import { DELETE_ORDER_RESET } from "../../Constraints/orderConstant";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.AllOrders);
  const {
    orderloading,
    error: orderError,
    isDeleted,
  } = useSelector((state) => state.EditOrder);

  const DeleteOrderHandler = (id) => {
    dispatch(AdminDeleteOrder(id));
  };

  const columns = [
    { field: "index", headerName: "S.No", minWidth: 50, flex: 0.4 },
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    { field: "mode", headerName: "P.Mode", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        let c = "";
        if (params.row.status === "Delivered") {
          c = "greenColor";
        } else if (params.row.status === "Shipped") {
          c = "purpleColor";
        } else {
          c = "redColor";
        }
        return c;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 40,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
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
          <>
            <Link to={`/admin/orders/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => DeleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        mode: item.paymentInfo.mode,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrorOrders());
    }
    if (orderError) {
      ToastError(orderError);
      dispatch(clearErrorOrders());
    }
    if (isDeleted) {
      ToastSuccess("successfully updated the order");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(AdminAllOrders());
  }, [dispatch, error, isDeleted, orderError]);
  return (
    <>
      <MetaData title="ALL ORDERS - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading || orderloading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL ORDERS</h1>
              <h2>TOTAL : {orders.length} Orders</h2>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersList;
