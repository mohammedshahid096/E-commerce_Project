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
import {
  AdminGetProducts,
  DeleteProduct,
  clearErrors,
} from "../../Actions/ProductAction";
import { Link } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../Constraints/ProductConstant";
import ReviewsIcon from "@mui/icons-material/Reviews";

const ProductsList = () => {
  const dispatch = useDispatch();

  const { products, loading, error, totalProducts } = useSelector(
    (state) => state.products
  );
  const { error: DeleteError, isDeleted } = useSelector(
    (state) => state.EditProduct
  );

  const DeleteProductHandler = (prdouctid) => {
    dispatch(DeleteProduct(prdouctid));
  };
  const columns = [
    { field: "index", headerName: "Index", minWidth: 60, flex: 0.5 },
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 320,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 110,
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
            <Link to={`/admin/products/${params.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => DeleteProductHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
    {
      field: "reviews",
      flex: 0.3,
      headerName: "Reviews",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/reviews/${params.id}`}>
              <ReviewsIcon />
            </Link>
            <Button>{params.row.reviews} </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
        reviews: item.reviews.length,
      });
    });

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      ToastSuccess("successfully product Deleted");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    if (DeleteError) {
      ToastError(DeleteError);
      dispatch(clearErrors());
      dispatch(AdminGetProducts());
    }
    dispatch(AdminGetProducts());
  }, [dispatch, error, isDeleted, DeleteError]);

  return (
    <>
      <MetaData title="ALL PRODUCTS - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">ALL PRODUCTS</h1>
              <h2>TOTAL : {totalProducts} products</h2>

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

export default ProductsList;
