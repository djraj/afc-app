// src/utils/api.js

const BASE_URL = 'http://localhost:4000/api';
const TOKEN_KEY = 'user_token'; // Key for storing token in local storage
const USER_KEY = 'userId';

export const login = async (username, password) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await fetch(`${BASE_URL}/user/login`, {
        // mode: 'no-cors',
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', },
        body: JSON.stringify({ username, password }),
      });
      
      console.log(response);
      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }
    
      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.token); // Store token
      localStorage.setItem(USER_KEY, data.userId); // Store userId
      return data;
};

export const validateToken = async (token) => {
  try {
    // const response = await axios.get(`${BASE_URL}/validate-token`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // return response.data.valid; // Return true/false based on validation
  } catch (err) {
    console.error(err);
    return false; // Handle errors as invalid
  }
};

// User API (optional, for profile management)
export const getUser = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await fetch(`${BASE_URL}/user/getUser`, {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },

      });
      
      console.log(response);
      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }
    
      const data = await response.json();
      return data;
  } catch (err) {
    console.error(err);
    return null; // Handle errors
  }
};

// Product API
export const getProducts = async () => {
  try {
    // const response = await axios.get(`${BASE_URL}/products`);
    // return response.data;
  } catch (err) {
    console.error(err);
    return []; // Handle errors
  }
};

// Order API
export const getOrders = async (token) => {
  try {
    // const response = await axios.get(`${BASE_URL}/orders`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // return response.data;
  } catch (err) {
    console.error(err);
    return []; // Handle errors
  }
};

export const createOrder = async (token, orderData) => {
  try {
    // const response = await axios.post(`${BASE_URL}/orders`, orderData, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // return response.data;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw for handling in components
  }
};
