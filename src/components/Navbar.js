// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  title,
  showLogout = false,
  showBackButton = false,
  backLink = "/",
}) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {showLogout && (
          <button className="logout-btn" onClick={() => navigate("/")}>
            <img
              src="/logout.png"
              alt="Logout"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        )}
        {showBackButton && (
          <Link to={backLink} className="back-btn">
            <img
              src="/placeholder-back.png"
              alt="Back"
              style={{ width: "24px", height: "24px" }}
            />
          </Link>
        )}
        <span className="navbar-brand">{title}</span>
      </div>
      <div className="navbar-right">
        <div className="menu-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="user-initials">AB</div>
      </div>
    </nav>
  );
}

export default Navbar;
