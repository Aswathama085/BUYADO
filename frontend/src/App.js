import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Navigate, Route, Routes, Outlet } from "react-router-dom";
import WebFont from "webfontloader";
import React, { Fragment } from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account" element={isAuthenticated ? <Profile /> : <LoginSignUp/>} />
          <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp/>} />
          <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp/>} />
          <Route path="/login" element={<LoginSignUp />} />

      
        </Routes>


        <Footer />
      </Fragment>
    </Router>
  );
}


export default App;
