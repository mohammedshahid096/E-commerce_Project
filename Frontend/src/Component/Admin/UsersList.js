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
import "./ProductsList.css";
import { Link } from "react-router-dom";
import {
  AdminUserDelete,
  GetAllUsers,
  clearErrors,
} from "../../Actions/UserAction";
import { DELETE_USER_RESET } from "../../Constraints/UserConstant";

const UsersList = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.AllUsers);
  const {
    loading: DeleteLoading,
    updateUser: isDeleted,
    error: DeleteError,
  } = useSelector((state) => state.Profile);

  const DeleteUserHandler = (id) => {
    dispatch(AdminUserDelete(id));
  };

  const columns = [
    { field: "index", headerName: "S.no", minWidth: 50, flex: 0.4 },
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
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
            <Link to={`/admin/users/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => DeleteUserHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      ToastSuccess(isDeleted);
      dispatch({ type: DELETE_USER_RESET });
    }
    if (DeleteError) {
      ToastError(DeleteError);
      dispatch(clearErrors());
    }
    dispatch(GetAllUsers());
  }, [dispatch, error, isDeleted, DeleteError]);

  return (
    <>
      <MetaData title="ALL USERS - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading || DeleteLoading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL USERS</h1>
              <h2>TOTAL : {users.length} users</h2>

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

export default UsersList;
