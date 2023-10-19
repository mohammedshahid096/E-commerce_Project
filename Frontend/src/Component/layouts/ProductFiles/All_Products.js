import "./All_products.css";
import Product from "./Product";
import MetaData from "../MetaData";
import Loader from "../LoadingFiles/Loader";
import Pagination from "react-js-pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllCategories,
  clearErrors,
  getProducts,
} from "../../../Actions/ProductAction";
import { useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ToastError } from "../../Alert-POP's/Alertpop";

const AllProducts = () => {
  const { Pkey } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    products,
    productsCount,
    pagePerProducts,
    currentProductCount,
    filterTotalProducts,
    error,
  } = useSelector((state) => state.products);
  const {
    loading: cLoading,
    categories,
    error: CategoryError,
  } = useSelector((state) => state.Category);

  const [current_page, setcurrent_page] = useState(1);
  const [price, setprice] = useState([0, 100000]);
  const [Catrgory, setCatrgory] = useState("");
  const [ratingfilter, setratingfilter] = useState("");

  useEffect(() => {
    if (CategoryError) {
      ToastError(CategoryError);
      dispatch(clearErrors());
    }
    if (error) {
      ToastError(CategoryError);
      dispatch(clearErrors());
    }
    dispatch(
      getProducts(Pkey ? Pkey : "", current_page, price, Catrgory, ratingfilter)
    );
    dispatch(GetAllCategories());
  }, [
    dispatch,
    Pkey,
    current_page,
    price,
    Catrgory,
    ratingfilter,
    CategoryError,
    error,
  ]);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = (event, newValue) => {
    setprice(newValue);
  };

  const clearAllFilters = () => {
    setCatrgory("");
    setprice([0, 100000]);
    setratingfilter("");
  };

  const RatinghandleChange = (event) => {
    setratingfilter(event.target.value);
  };

  return (
    <>
      {loading || cLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"All Products"} />
          <div className="productheading">
            <h1>Products</h1>
          </div>

          <div className="mainPage">
            <div className="filters">
              <button className="clearallfilters" onClick={clearAllFilters}>
                Clear Filter
              </button>
              <div className="pricerange">
                <Box>
                  <Typography className="filterheading"> Price </Typography>
                  <Slider
                    aria-labelledby="range-slider"
                    value={price}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={valuetext}
                    min={0}
                    max={100000}
                    color="secondary"
                    className="slider"
                  />
                </Box>
              </div>

              <div className="categories">
                <Typography className="filterheading">Categories</Typography>
                <ul>
                  <li onClick={() => setCatrgory("")}>All</li>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <li
                          key={item._id}
                          onClick={() => {
                            setcurrent_page(1);
                            setCatrgory(item.categoryName);
                          }}
                        >
                          {item.categoryName}
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="ratingsfilter">
                <Typography className="filterheading">Above Ratings</Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    row
                    value={ratingfilter}
                    onChange={RatinghandleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="1"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio size="small" />}
                      label="2"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio size="small" />}
                      label="3"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio size="small" />}
                      label="4"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio size="small" />}
                      label="5"
                    />
                    <FormControlLabel
                      value=""
                      control={<Radio size="small" />}
                      label="All"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="all_products">
              {products &&
                products.map((item) => (
                  <Product product_item={item} key={item._id} />
                ))}
              {currentProductCount === 0 && <div>no products found</div>}
            </div>
          </div>

          {pagePerProducts < filterTotalProducts && (
            <div className="paginationBox">
              <Pagination
                activePage={current_page}
                itemsCountPerPage={pagePerProducts}
                totalItemsCount={productsCount}
                onChange={(e) => {
                  setcurrent_page(e);
                  if (currentProductCount === 0) {
                    setcurrent_page(1);
                  }
                }}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                // className="page-item"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllProducts;
