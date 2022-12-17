import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../../features/userSlice";

const PrivateRoutes = () => {
  const user = useSelector(selectUser);
  console.log(user);
  let userr = true;
  return userr ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
