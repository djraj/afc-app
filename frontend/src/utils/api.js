// src/utils/api.js

const BASE_URL = "http://localhost:4000/api";
const TOKEN_KEY = "user_token"; // Key for storing token in local storage
const USER_KEY = "userId";

export const saveUserToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token); // Store token
}

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

export const deleteUserToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
}

export const saveUserID = (userid) => {
  localStorage.setItem(USER_KEY, userid); // Store user id
}

export const getUserID = () => {
  return localStorage.getItem(USER_KEY);
}

export const deleteUserID = () => {
  return localStorage.removeItem(USER_KEY);
}

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const data = await response.json();
  localStorage.setItem(TOKEN_KEY, data.token); // Store token
  localStorage.setItem(USER_KEY, data.userId); // Store userId
  return data;
};

// User API (for profile management)
export const getUser = async () => {
  try {
    const token = getUserToken();
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = getUserToken();
    // console.log("prodtoken",token)
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response);
    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("getProducts: ",data);
    return data;
  } catch (err) {
    console.error(err);
    return []; // Handle errors
  }
};

export const createProduct = async (productData) => {
  const token = getUserToken();

  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData), // Convert product data to JSON
    });

    if (!response.ok) {
      throw new Error(`Failed to create product with status ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the created product data
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for handling in components
  }
};



// Order API
export const getOrders = async () => {
  try {
    const token = getUserToken();
    // console.log("ordtoken",token)
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    
    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("getOrders: ",data);
    return data;
  } catch (err) {
    console.error(err);
    return []; // Handle errors
  }
};

export const createOrderAPI = async (orderData) => {
  const token = getUserToken();

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData), // Convert product data to JSON
    });

    if (!response.ok) {
      throw new Error(`Failed to create product with status ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the created product data
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error for handling in components
  }
};
