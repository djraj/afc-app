// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { getProducts } from "../../utils/api";
import { useNavigate } from "react-router-dom"; // for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      console.log("Product list: ", data);
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const handleRedirectAddProduct = async (e) => {
    e.preventDefault();
    navigate("/products/create-product"); // Redirect to create product
  };

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-lg">
          <div className="row">
            <div className="col-md-8">
              <h1>Products</h1>
            </div>
            <div className="col-md-4">
              <div className="d-grid gap-2">
                <button className="btn btn-info" onClick={handleRedirectAddProduct}>
                  <FontAwesomeIcon icon={fas.faCirclePlus} className="pe-2" />
                  Add Product
                </button>
              </div>
            </div>
          </div>

          <hr />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
