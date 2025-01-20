import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "./auth";

const ProtectedRoute = ({ children }) => {
  //   const { isAuthenticated } = useAuth();

  let isAuthenticated = false;
  if (localStorage.getItem("isAuthenticated") !== undefined) {
    isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
