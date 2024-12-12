import React from "react";
import Navbar from "../Comps/Navbar";
import { Outlet } from "react-router-dom";

const NavLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavLayout;
