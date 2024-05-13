// src/components/OrderList.js
import React, { useEffect, useState } from 'react';
import { getOrders } from '../../utils/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order list for the logged-in user using the API with token
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return; // Handle missing token

      try {
        const response = await getOrders(userId);
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              {/* Display order items */}
              <td>
                {order.items.map((item) => (
                  <span key={item.product_id}>
                    {item.name} ({item.quantity})
                  </span>
                ))}
              </td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
