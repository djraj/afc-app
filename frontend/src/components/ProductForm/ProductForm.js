import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getUserToken, createProduct } from "../../utils/api";

const ProductForm = ({onLogin}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(price);
    if (!Number.isInteger(price) || Number.isNaN(price)) {
      const temp = Math.round(price);
      setPrice(temp.toFixed(2));
    }

    const product = {
      productName: name,
      productDesc: description,
      productPrice: price,
    };
    const response = await createProduct(product);
    console.log(response);

    alert("Product created successfully!");
    navigate("/products");
  };

  const handleBack = () => {
    navigate(-1); // Go back one route in history
  };

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      onLogin(false);
      navigate("/login"); // Redirect to login if no token
    }
  }, []);

  return (
    <div className="row justify-content-center p-5">
      <div className="col-lg">
        <div className="row">
          <div className="col-12">
            <h1>Add Product</h1>
          </div>
        </div>
        <hr />
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="name">
                  Product name
                </span>
                <input
                  type="text"
                  aria-describedby="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="price">
                  Product Price $
                </span>
                <input
                  type="text"
                  aria-describedby="price"
                  className="form-control"
                  id="price"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="input-group">
                <span className="input-group-text" id="description">
                  Product Description
                </span>
                <textarea
                  type="text"
                  aria-describedby="description"
                  className="form-control"
                  id="description"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="d-grid gap-2">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleBack}
                  >
                    <FontAwesomeIcon icon={fas.faCaretLeft} className="pe-2" />
                    Back
                  </button>
                  <button className="btn btn-primary" type="submit">
                    <FontAwesomeIcon icon={fas.faCirclePlus} className="pe-2" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
