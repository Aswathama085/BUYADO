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
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ProtectedRoute from "./component/routes/ProtectedRoute";

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

          <ProtectedRoute path="/account" element={<Profile />}/>
          <ProtectedRoute path="/me/update" element={<UpdateProfile/>}/>
          <ProtectedRoute path="/password/update" element={<UpdatePassword />}/>

          <Route path="/login" element={<LoginSignUp />} />

      
        </Routes>


        <Footer />
      </Fragment>
    </Router>
  );
}


export default App;
