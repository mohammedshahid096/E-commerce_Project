import React from "react";
import "./product.css";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";

const Product = (props) => {
  const { product_item } = props;
  const { Pkey } = useParams();
  let redirect;
  if (Pkey) {
    redirect = "../products/product";
  } else {
    redirect = "product";
  }
  const starOption = {
    edit: false,
    activeColor: "tomato",
    value: product_item.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 19 : 15,
  };
  return (
    <Link to={`${redirect}/${product_item._id}`}>
      <div className="productCart">
        <img src={product_item.image[0].url} alt="shirt1" />
        <p>{product_item.name}</p>
        <div>
          <ReactStars {...starOption} />
          <span>{product_item.numofReviews} Reviews</span>
        </div>
        <span>₹ {product_item.price}</span>
      </div>
    </Link>
  );
};

export default Product;
