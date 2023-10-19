import React from "react";
import { Link } from "react-router-dom";
import "./cartsingleproduct.css";

const CartSingleProduct = (props) => {
  const { item, deleteProduct } = props;
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="ssa" />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ₹${item.price}`}</span>
          <p
            onClick={() => {
              deleteProduct(item.product);
            }}
          >
            Remove
          </p>
        </div>
      </div>
    </>
  );
};

export default CartSingleProduct;
