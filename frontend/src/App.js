// src/App.js (updated)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList'; 
import OrderList from './components/OrderList/OrderList';
import OrderForm from './components/OrderForm/OrderForm';
import LoginPage from './components/Login/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SideMenu />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Dashboard />} /> {/* Default route to Dashboard */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/create-order" element={<OrderForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
