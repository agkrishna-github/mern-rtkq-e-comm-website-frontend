import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "../pages/Footer";

function Layout() {
  return (
    <div className="vw-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
