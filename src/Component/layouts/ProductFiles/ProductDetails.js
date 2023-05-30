import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productdetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  newReviewSubmit,
  clearErrors,
} from "../../../Actions/ProductAction";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../LoadingFiles/Loader";
import MetaData from "../MetaData";
// import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { addItemsCart } from "../../../Actions/CartAction";
import { ToastSuccess, ToastError } from "../../Alert-POP's/Alertpop";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Rating } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { NEW_REVIEW_RESET } from "../../../Constraints/ProductConstant";

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetails);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setquantity] = useState(1);
  const [ReviewRating, setReviewRating] = useState(null);
  const [ReviewComment, setReviewComment] = useState("");
  const [reviewOpen, setreviewOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (reviewError) {
      ToastError(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      ToastSuccess("Review Submit Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, reviewError, success]);

  const starOption = {
    value: product.ratings,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  // TODO: increase the product quantity function
  const increaseProductQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    setquantity(quantity + 1);
  };

  // TODO: decrease the product quatity function
  const decreaseProductQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const AddtoCart = () => {
    if (isAuthenticated) {
      dispatch(addItemsCart(id, quantity));
      ToastSuccess("Item Added to Cart");
    } else {
      navigate("/login");
    }
  };

  const submitReviewToggle = () => {
    reviewOpen ? setreviewOpen(false) : setreviewOpen(true);
  };

  const newReviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.append("rating", ReviewRating);
    myForm.append("comment", ReviewComment);
    myForm.append("productId", id);

    dispatch(newReviewSubmit(myForm));
    setreviewOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="ProductDetails">
            <div className="carouseldiv">
              <Carousel>
                {product.image &&
                  product.image.map((item, index) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      alt={`${index} Slide`}
                      key={item.url}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="details">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...starOption} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numofReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseProductQuantity}>-</button>
                    {/* <input readOnly type="number" value={quantity} /> */}
                    <span>{quantity}</span>
                    <button onClick={increaseProductQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={AddtoCart}
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simeple-dialog-title"
            open={reviewOpen}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setReviewRating(e.target.value)}
                value={ReviewRating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={ReviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button
                autoFocus
                color="primary"
                onClick={newReviewSubmitHandler}
              >
                {" "}
                Submit{" "}
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
