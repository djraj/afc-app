// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, getOrders, getProducts } from "../../utils/api";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getUserToken();
    // console.log("dashtoken", token);
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return; // Exit if no token
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
  }, []);

  return (
    <div className="section p-5">
      <h1>Dashboard</h1>
      <hr />
      <div class="row">
        <div class="col-sm-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total Number of Orders</h5>
              <p class="card-text fs-1">
              {totalOrders}
              </p>
              <a href="#" class="btn btn-primary">
                View All Orders
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total Number of Products</h5>
              <p class="card-text fs-1">
              {totalProducts}
              </p>
              <a href="#" class="btn btn-primary">
                View All Products
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
