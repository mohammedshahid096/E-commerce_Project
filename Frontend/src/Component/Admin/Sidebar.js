import React from "react";
import "./Sidebar.css";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import logo from "../../Images/ecommerceLogo.jpg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" id="dasdimg" />
      </Link>
      <Link to="/admin/dashboard">
        <DashboardIcon /> Dashboard
      </Link>

      <Link>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/products/add">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <ListAltIcon /> Orders
      </Link>
      <Link to="/admin/users">
        <PeopleIcon /> Users
      </Link>
      <Link to="/admin/dashboard">
        <RateReviewIcon /> Reviews
      </Link>
    </div>
  );
};

export default Sidebar;
