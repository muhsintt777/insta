import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../bottomNav/BottomNav";
import Header from "../header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
};

export default Layout;
