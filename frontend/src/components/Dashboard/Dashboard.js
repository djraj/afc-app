// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { getUserToken } from '../../utils/api';

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const navigate  = useNavigate();

  useEffect(() => {
    const token = getUserToken();
    console.log("dashtoken",token)
    if (!token) {
      // navigate('/login'); // Redirect to login if no token
    }
    // Fetch total orders using the API with token
  }, []); // Empty dependency array for initial fetch on component mount

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Orders: {totalOrders}</p>
      {/* Add links to other pages (ProductList, Orders) */}
    </div>
  );
};

export default Dashboard;
