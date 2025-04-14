import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";
import "./Header.css";

const Header = () => {
  return (
    // move the <header> tag from App.jsx to here
    <header className="header">
      {/* Include the logo in <nav> and add className to replicate the styling */}
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Cocktail Kungen" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink to="/" end>
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites">My Favourites</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
