import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import StoreData from "./StoreData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={StoreData}>
    <App />
  </Provider>
);
