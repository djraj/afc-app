// src/components/OrderForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { getUserToken, getProducts, createOrderAPI } from "../../utils/api";

const OrderForm = ({onLogin}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // List of available products
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products for order
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // State to store any errors

  // Function to fetch products (consider using an API call)
  const fetchProducts = async () => {
    setIsLoading(true); // Set loading state

    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError(err.message); // Set error state
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Function to handle product selection (update selectedProducts and calculate total price)
  const handleProductSelection = (productId, quantity) => {
    const updatedSelectedProducts = [...selectedProducts];
    const productIndex = updatedSelectedProducts.findIndex(
      (item) => item.productId === productId
    );

    if (quantity === 0) {
      // Remove product if quantity is 0
      updatedSelectedProducts.splice(productIndex, 1);
    } else {
      if (productIndex === -1) {
        // Add new product selection
        updatedSelectedProducts.push({ productId, quantity });
      } else {
        // Update quantity for existing selection
        updatedSelectedProducts[productIndex].quantity = quantity;
      }
    }

    setSelectedProducts(updatedSelectedProducts);
    calculateTotalPrice(); // Recalculate total price on selection change
  };

  // Function to calculate total price based on selected products
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    setTotalPrice(total);
  };

  // Function to create an order using an API call (assuming an API endpoint exists)
  const createOrder = async () => {
    if (selectedProducts.length === 0) {
      setError("Please select products for your order.");
      return; // Prevent creating empty orders
    }

    setIsLoading(true); // Set loading state
    try {
      const response = await createOrderAPI(selectedProducts);
      console.log(response);
      console.log("Order created successfully:"); // Handle successful order creation
      alert("Order created successfully!")
      navigate("/orders");
    } catch (err) {
      setError(err.message); // Set error state
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Fetch products on component mount (assuming products are static)
  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      onLogin(false);
      navigate("/login"); // Redirect to login if no token
    }

    fetchProducts();
  }, []);

  const renderProductSelection = (product) => (
    <div key={product.id}>
      <label>
        <input
          type="checkbox"
          checked={selectedProducts.some(
            (item) => item.productId === product.id
          )}
          onChange={(e) =>
            handleProductSelection(product.id, e.target.checked ? 1 : 0)
          }
        />
        {product.name} (Price: ${product.price})
      </label>
      {selectedProducts.some((item) => item.productId === product.id) && (
        <input
          type="number"
          min="1"
          value={
            selectedProducts.find((item) => item.productId === product.id)
              .quantity || 1
          }
          onChange={(e) =>
            handleProductSelection(product.id, parseInt(e.target.value))
          }
        />
      )}
    </div>
  );

  return (
    <div>
      <h1>Create Order</h1>
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Product selection form elements */}
          {products.map(renderProductSelection)}
          <button onClick={createOrder} disabled={isLoading}>
            {isLoading ? "Creating Order..." : "Create Order"}
          </button>
        </>
      )}

      {totalPrice > 0 && !isLoading && !error && (
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      )}
    </div>
  );
};

export default OrderForm;
