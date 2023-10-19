import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as CHARTJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { AdminGetProducts } from "../../Actions/ProductAction";
import { AdminAllOrders } from "../../Actions/OrderAction";
import { GetAllUsers } from "../../Actions/UserAction";

CHARTJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { totalProducts, products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.AllOrders);
  const { users } = useSelector((state) => state.AllUsers);

  const dispatch = useDispatch();

  let TOTALAMOUNT = 0;
  orders &&
    orders.forEach((item) => {
      TOTALAMOUNT += item.totalPrice;
    });

  // line chart state
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, TOTALAMOUNT],
      },
    ],
  };

  let OutofStock = 0;
  products &&
    products.forEach((element) => {
      if (element.stock === 0) {
        OutofStock += 1;
      }
    });

  // donut circle chart state
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [OutofStock, totalProducts - OutofStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(AdminGetProducts());
    dispatch(AdminAllOrders());
    dispatch(GetAllUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">DASHBOARD</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {TOTALAMOUNT}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{totalProducts && totalProducts}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
