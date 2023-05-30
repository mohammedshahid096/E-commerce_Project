import "./home.css";
import MetaData from "../MetaData";
import Loader from "../LoadingFiles/Loader";
import Product from "../ProductFiles/Product";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ToastError } from "../../Alert-POP's/Alertpop.js";
import { FeatureProducts } from "../../../Actions/ProductAction";

// productsCount

const Home = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.featureProducts
  );
  useEffect(() => {
    dispatch(FeatureProducts());
  }, [dispatch]);

  if (error) {
    ToastError(error);
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Ecommerce"} />
          <div className="pamplet">
            <div className="tags">
              <p>My Shopping House</p>
              <h1>Experience </h1>
              <h1>The Difference</h1>
            </div>

            <div className="custom-shape-divider-bottom-1676311021">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>

          <h2 className="productFeature_heading">Featured Products</h2>
          <div className="productfeatureslist">
            {products &&
              products.map((item) => (
                <Product product_item={item} key={item._id} />
              ))}

            <ToastContainer />
          </div>
          <div></div>
        </>
      )}
    </>
  );
};

export default Home;
