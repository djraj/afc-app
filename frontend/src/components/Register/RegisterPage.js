// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { registerUser } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      confPassword === ""
    ) {
      alert("Please fill out all fields");
      return;
    }

    if (password !== confPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username: username,
      password: password,
      first_name: firstname,
      last_name: lastname,
      email: email,
    };
    const response = await registerUser(user);
    console.log(response);

    alert("User created successfully!");
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // Go back one route in history
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group pb-3">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    placeholder="Enter first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="lastname">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter last name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Retype Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
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
                      <FontAwesomeIcon
                        icon={fas.faCaretLeft}
                        className="pe-2"
                      />
                      Back
                    </button>
                    <button className="btn btn-primary" type="submit">
                      <FontAwesomeIcon icon={fas.faUserPlus} className="pe-2" />
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
