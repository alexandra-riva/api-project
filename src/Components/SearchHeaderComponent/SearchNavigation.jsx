import React from "react";
import { Link } from "react-router-dom";
import "./DynamicHeader.css";

const SearchNavigation = ({
  onSearchByNameClick,
  onSearchByIngredientClick,
  onRandomDrink,
  onGetAll,
  activeItem,
  setActiveItem,
}) => {
  const isActiveItem = (item) => activeItem === item;

  return (
    <nav className="search-navigation" aria-label="Search Navigation">
      <ul>
        <li
          className={isActiveItem("name") ? "active" : ""}
          onClick={() => {
            setActiveItem("name");
            onSearchByNameClick();
          }}
        >
          Search by name
        </li>
        <li
          className={isActiveItem("ingredient") ? "active" : ""}
          onClick={() => {
            setActiveItem("ingredient");
            onSearchByIngredientClick();
          }}
        >
          Search by ingredient
        </li>
        <li
          className={isActiveItem("random") ? "active" : ""}
          onClick={() => {
            setActiveItem("random");
            onRandomDrink();
          }}
        >
          Get a random drink
        </li>
        <li
          className={isActiveItem("all") ? "active" : ""}
          onClick={() => {
            setActiveItem("all");
            onGetAll();
          }}
        >
          See all
        </li>
        <li
  className={isActiveItem("add") ? "active" : ""}
  onClick={() => setActiveItem("add")}
>
  <Link to="/add" className="plain-link">+ Add Cocktails</Link>
</li>

      </ul>
    </nav>
  );
};

export default SearchNavigation;
