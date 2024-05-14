import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../utils/api";

const ProductForm = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (Number.isInteger(price)) {
      console.log("The product price is an integer.");
    } else {
      console.log("The product price is not an integer.");
      alert("The product price is not an integer.");
      return;
    }
    const product = {
      productName: name,
      productDesc: description,
      productPrice: price,
    };
    const response = await createProduct(product);

    if (!response.ok) {
      alert(`Error creating product: ${response.err.message}`);
    } else {
      alert("Product created successfully!");
      navigate("/products");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back one route in history
  };

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
                <span class="input-group-text" id="name">
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
                <span class="input-group-text" id="price">
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
                <span class="input-group-text" id="description">
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
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-secondary"
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
