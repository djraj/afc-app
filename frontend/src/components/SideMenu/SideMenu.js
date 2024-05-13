// src/components/SideMenu.js
import React from 'react';
import { Link } from 'react-router-dom'; // for navigation

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/create-order">Create Order</Link>
        </li>
        <li>
          <button onClick={() => { /* Logout functionality */ }}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
