// src/App.js (updated)
import React, { useState, useEffect } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu/SideMenu";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductList from "./components/ProductList/ProductList";
import ProductForm from "./components/ProductForm/ProductForm";
import OrderList from "./components/OrderList/OrderList";
import OrderForm from "./components/OrderForm/OrderForm";
import LoginPage from "./components/Login/LoginPage";
import { getUserToken } from "./utils/api";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for stored token or login status
    const isLoggedInFromStorage = getUserToken();
    // If token exists, set isLoggedIn to true
    // console.log("isl",isLoggedInFromStorage)
    if (isLoggedInFromStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status); // Update login status on login/logout
  };

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* <SideMenu /> */}
          <div className="col-md-4 ps-0">
            {isLoggedIn && <SideMenu onLogin={handleLogin} />}
          </div>

          <div className="col-md-8">
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />
              <Route path="/" element={<Dashboard onLogin={handleLogin}/>} />
              <Route path="/products" element={<ProductList onLogin={handleLogin}/>} />
              <Route path="/orders" element={<OrderList onLogin={handleLogin}/>} />
              <Route path="/products/create-product" element={<ProductForm onLogin={handleLogin}/>} />
              <Route path="/orders/create-order" element={<OrderForm onLogin={handleLogin}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
