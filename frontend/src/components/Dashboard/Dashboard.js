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
      navigate('/login'); // Redirect to login if no token
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
    <div>
      <h1>Dashboard</h1>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Products: {totalProducts}</p>
    </div>
  );
};

export default Dashboard;
