import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Loader from "../layouts/LoadingFiles/Loader";
import MetaData from "../layouts/MetaData";
import { ToastError, ToastSuccess } from "../Alert-POP's/Alertpop";
import Sidebar from "./Sidebar";
import "./ProductsList.css";
import { useParams } from "react-router-dom";
import { deleteReviews, getAllReviews } from "../../Actions/ProductAction";
import { clearErrors } from "../../Actions/UserAction";
import { DELETE_REVIEW_RESET } from "../../Constraints/ProductConstant";

const ReviewsList = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();

  const { error, loading, reviews, product } = useSelector(
    (state) => state.productReviews
  );

  const {
    error: DError,
    loading: DLoading,
    isDeleted,
  } = useSelector((state) => state.EditReview);

  const DeleteReviewHandler = (reviewID) => {
    dispatch(deleteReviews(reviewID, productID));
  };
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 150,
      flex: 0.4,

      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
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
            <Button onClick={() => DeleteReviewHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      ToastSuccess("Successfully Review is Deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    if (DError) {
      ToastError(DError);
      dispatch(clearErrors());
    }

    dispatch(getAllReviews(productID));
  }, [dispatch, error, productID, isDeleted, DError]);

  return (
    <>
      <MetaData title="ALL PRODUCTS - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          {loading || DLoading ? (
            <Loader />
          ) : (
            <>
              <h1 id="productListHeading">{product && product}</h1>
              <h2>TOTAL : {reviews && reviews.length} Reviews</h2>

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

export default ReviewsList;
