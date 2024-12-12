import React, { useState, useEffect } from "react";
import Home from "./Comps/Home";
import NavLayout from "./Layout/NavLayout";
import Advertisments from "./pages/Advertisments";
import Product from "./pages/Product";
import Login from "./Login";
import { useParams } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Ad from "./pages/Ad";

const App = () => {
  const { fullName } = useParams();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/advertisments" element={<Advertisments />} />
        <Route path={`/advertisments/:fullName`} element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ad/:id" element={<Ad />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
