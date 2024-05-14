// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { getOrders, getUserID } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order list for the logged-in user using the API with token
    const fetchOrders = async () => {
      // const userId = getUserID();
      // if (!userId) return; // Handle missing token

      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const handleRedirectCreateOrder = async (e) => {
    e.preventDefault();
    navigate("/orders/create-order"); // Redirect to create product
  };

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-lg">
          <div className="row">
            <div className="col-md-8">
              <h1>Orders</h1>
            </div>
            <div className="col-md-4">
              <div className="d-grid gap-2">
                <button
                  className="btn btn-info"
                  onClick={handleRedirectCreateOrder}
                >
                  <FontAwesomeIcon icon={fas.faCirclePlus} className="pe-2" />
                  Create Order
                </button>
              </div>
            </div>
          </div>
          <hr />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Items</th>
                <th scope="col">Status</th>
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
      </div>
    </div>
  );
};

export default OrderList;
