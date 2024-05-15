// src/components/SideMenu.js
import React, { useEffect, useState } from "react";
import "./SideMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; // for navigation
import { deleteUserID, deleteUserToken, getUser } from "../../utils/api";

const SideMenu = ({ onLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      // console.log("User: ", data);
      setUser(data.message);
    };

    fetchUser();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      deleteUserToken(); // Remove stored token
      deleteUserID(); // Remove stored token
      onLogin(false);
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
    <div
      id="bdSidebar"
      className="d-flex flex-column 
                    flex-fill 
                    p-3 bg-dark bg-gradient
                    text-white offcanvas-md offcanvas-start min-vh-100"
    >
      <span>
        <p className="text-center"> AFC APP</p>
      </span>
      <span>
        <p className="text-center">
          Welcome, {user.first_name + " " + user.last_name}
        </p>
      </span>
      <hr />
      <ul className="mynav nav nav-pills flex-column mb-auto">
        <li className="nav-item p-2">
          <FontAwesomeIcon icon={fas.faHouse} className="pe-2" />
          <Link to="/">Dashboard</Link>
        </li>
        <li className="nav-item p-2">
          <FontAwesomeIcon icon={fas.faLayerGroup} className="pe-2" />
          <Link to="/products">Products</Link>
        </li>
        <li className="nav-item p-2">
          <FontAwesomeIcon icon={fas.faClipboardList} className="pe-2" />
          <Link to="/orders">Orders</Link>
        </li>
        <hr />
        <li className="nav-item p-2">
          <i className="fa-solid fa-graduation-cap"></i>
          <div className="d-grid gap-2">
            <button onClick={handleLogout} className="btn btn-danger">
              <FontAwesomeIcon icon={fas.faRightFromBracket} className="pe-2" />
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>

</div>

    
  );
};

export default SideMenu;
