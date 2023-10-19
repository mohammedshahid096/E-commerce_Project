import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const Search = () => {
  const [searchkey, setsearchkey] = useState("");
  const navigate = useNavigate();

  const submitKeyProduct = (e) => {
    e.preventDefault();
    let k = searchkey.trim();
    if (k) {
      navigate("/products/" + k);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <MetaData title="Search Products" />
      <div className="searchdiv">
        <input
          type="text"
          placeholder="Search a product"
          onChange={(e) => setsearchkey(e.target.value)}
        />
        <input type="button" value="Search" onClick={submitKeyProduct} />
      </div>
    </>
  );
};

export default Search;
