import React from "react";
import { Link } from "react-router-dom";

function Navbar({
  title,
  showLogout = false,
  showBackButton = false,
  backLink = "/",
}) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {showLogout && (
          <button className="logout-btn">
            <span className="logout-icon">⎋</span>
          </button>
        )}
        {showBackButton && (
          <Link to={backLink} className="back-btn">
            &#8592;
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
