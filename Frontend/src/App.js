import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/layouts/headerFiles/Header.js";
import webfont from "webfontloader";
import Footer from "./Component/layouts/FooterFiles/Footer";
import Home from "./Component/layouts/HomeFiles/Home.js";
import ProductDetails from "./Component/layouts/ProductFiles/ProductDetails";
import AllProducts from "./Component/layouts/ProductFiles/All_Products.js";
import Search from "./Component/layouts/ProductFiles/Search";
import Account from "./Component/Users/Account";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import StoreData from "./StoreData";
import { load_user } from "./Actions/UserAction";
import { UserOptions } from "./Component/layouts/headerFiles/UserOptions";
import { useSelector } from "react-redux";
import { UserProfile } from "./Component/Users/UserProfile";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import UserProfileUpdate from "./Component/Users/UserProfileUpdate";
import CartList from "./Component/layouts/CartFiles/Cart";
import Shipping from "./Component/layouts/CartFiles/Shipping";
import ConfirmOrder from "./Component/layouts/CartFiles/ConfirmOrder";
import PaymentOptions from "./Component/layouts/CartFiles/PaymentOptions";
import orderSuccess from "./Component/layouts/CartFiles/orderSuccess";
import MyOrders from "./Component/layouts/OrderFiles/MyOrders";
import OrderDetails from "./Component/layouts/OrderFiles/OrderDetails";
import Dashboard from "./Component/Admin/Dashboard";
import ProductsList from "./Component/Admin/ProductsList";
import NewProduct from "./Component/Admin/NewProduct";
import UpdateProduct from "./Component/Admin/UpdateProduct";
import OrdersList from "./Component/Admin/OrdersList";
import UpdateOrder from "./Component/Admin/UpdateOrder";
import UsersList from "./Component/Admin/UsersList";
import { UpdateUser } from "./Component/Admin/UpdateUser";
import ReviewsList from "./Component/Admin/ReviewsList";
import Notfound from "./Component/layouts/NotFound/Notfound";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Poppins", "Chilanka"],
      },
    });

    StoreData.dispatch(load_user());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions userDetails={user} />}
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<AllProducts />} />
          <Route extact path="/products/:Pkey" element={<AllProducts />} />
          <Route
            extact
            path="/products/product/:id"
            element={<ProductDetails />}
          />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/login" element={<Account />} />
          <Route
            extact
            path="/account"
            element={<ProtectedRoute Comp={UserProfile} />}
          />
          <Route
            extact
            path="/account/update"
            element={<ProtectedRoute Comp={UserProfileUpdate} />}
          />
          <Route
            extact
            path="/cart"
            element={<ProtectedRoute Comp={CartList} />}
          />
          <Route
            extact
            path="/shipping"
            element={<ProtectedRoute Comp={Shipping} />}
          />
          <Route
            extact
            path="/order/confirm"
            element={<ProtectedRoute Comp={ConfirmOrder} />}
          />
          <Route
            extact
            path="/order/paymentoptions"
            element={<ProtectedRoute Comp={PaymentOptions} />}
          />
          <Route
            extact
            path="/orders"
            element={<ProtectedRoute Comp={MyOrders} />}
          />
          <Route
            extact
            path="/orders/:orderid"
            element={<ProtectedRoute Comp={OrderDetails} />}
          />
          <Route
            extact
            path="/success"
            element={<ProtectedRoute Comp={orderSuccess} />}
          />
          <Route
            extact
            path="/admin/dashboard"
            element={<ProtectedRoute Comp={Dashboard} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/products"
            element={<ProtectedRoute Comp={ProductsList} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/products/add"
            element={<ProtectedRoute Comp={NewProduct} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/products/:productID"
            element={<ProtectedRoute Comp={UpdateProduct} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/orders"
            element={<ProtectedRoute Comp={OrdersList} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/orders/:orderID"
            element={<ProtectedRoute Comp={UpdateOrder} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/users"
            element={<ProtectedRoute Comp={UsersList} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/users/:userID"
            element={<ProtectedRoute Comp={UpdateUser} isAdmin={true} />}
          />
          <Route
            extact
            path="/admin/reviews/:productID"
            element={<ProtectedRoute Comp={ReviewsList} isAdmin={true} />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
