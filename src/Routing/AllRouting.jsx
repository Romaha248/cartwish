import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../components/Home/HomePage";
import ProductsPage from "../components/Products/ProductsPage";
import SingleProductPage from "../components/SingleProduct/SingleProductPage";
import CartPage from "../components/Cart/CartPage";
import MyOrderPage from "../components/MyOrder/MyOrderPage";
import LoginPage from "../components/Authentication/LoginPage";
import SignupPage from "../components/Authentication/SignupPage";

const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/1" element={<SingleProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/myorders" element={<MyOrderPage />} />
    </Routes>
  );
};

export default AllRouting;
