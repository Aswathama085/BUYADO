import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate,useLocation} from "react-router-dom";

function ProtectedRoute({children}){

  const {isAuthenticated} = useSelector((state) => state.user);
  const location=useLocation();

  return isAuthenticated===true ? children : <Navigate to="/login" replace state={{ path: location.pathname }}  />;
};

export default ProtectedRoute;