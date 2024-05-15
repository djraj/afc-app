// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getOrders, getProducts } from "../../utils/api";

const Dashboard = ({ onLogin }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getUserToken();
    // console.log("dashtoken", token);
    if (!token) {
      onLogin(false);
      navigate("/login"); // Redirect to login if no token
      // return; // Exit if no token
    }

    const fetchTotalOrders = async () => {
      const response = await getOrders();
      setTotalOrders(response.total); // Update state
    };

    const fetchTotalProducts = async () => {
      const response = await getProducts();
      setTotalProducts(response.total); // Update state
    };

    fetchTotalOrders();
    fetchTotalProducts(); // Call both functions
    // eslint-disable-next-line
  }, []);

  const handleRedirectAllProduct = async (e) => {
    e.preventDefault();
    navigate("/products"); 
  };

  const handleRedirectAllOrders = async (e) => {
    e.preventDefault();
    navigate("/orders"); 
  };

  return (
    <div className="section p-5">
      <h1>Dashboard</h1>
      <hr />
      <div className="row">
        <div className="col-sm-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Number of Orders</h5>
              <p className="card-text fs-1">
              {totalOrders}
              </p>
              <div className="d-grid gap-2">
                <button className="btn btn-info" onClick={handleRedirectAllOrders}>
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Number of Products</h5>
              <p className="card-text fs-1">
              {totalProducts}
              </p>
              <div className="d-grid gap-2">
                <button className="btn btn-info" onClick={handleRedirectAllProduct}>
                  View All Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
