// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import { login, saveUserToken, saveUserID } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Call login function from api.js
      console.log("resp", response);
      saveUserToken(response.token); // Store token in local storage
      saveUserID(response.userId); // Store token in local storage
      onLogin(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate("/register"); // Redirect to register
  };

  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4>Sign In</h4>
            </div>
            <form onSubmit={handleLogin}>
              <div className="card-body">
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
              </div>
              <div className="card-footer">
                <div className="d-grid gap-2">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleRegister}
                    >
                      <FontAwesomeIcon icon={fas.faUserPlus} className="pe-2" />
                      Register
                    </button>
                    <button className="btn btn-primary" type="submit">
                      <FontAwesomeIcon
                        icon={fas.faRightToBracket}
                        className="pe-2"
                      />
                      Sign In
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

export default LoginPage;
