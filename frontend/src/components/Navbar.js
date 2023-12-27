// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/create-post">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
