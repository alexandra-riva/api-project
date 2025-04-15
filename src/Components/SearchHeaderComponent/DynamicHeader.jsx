import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import SearchNavigation from "./SearchNavigation";
import CocktailsList from "../CocktailListComponent/CocktailList";
import Loader from "../LoaderComponent/Loader";
import "./DynamicHeader.css";
import {
  fetchAllCocktails,
  fetchCocktailsByName,
  fetchCocktailsByIngredient,
  fetchRandomCocktail,
} from "../../api";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const DynamicHeader = ({ type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("name");
  const [placeholder, setPlaceholder] = useState("Search for a cocktail...");
  const [inputValue, setInputValue] = useState("");
  const searchInputRef = useRef(null);

  const isFavorites = type === "favorites";

  const handleApiError = (error, message) => {
    console.error(message, error);
    setItems([]);
  };

  const getAll = async () => {
    setLoading(true);
    try {
      const [data] = await Promise.all([fetchAllCocktails(), delay(3000)]);
      setItems(data || []);
    } catch (error) {
      handleApiError(error, "Failed to fetch all cocktails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFavorites) {
      getAll();
    }
  }, [isFavorites]); // ✅ getAll is now defined above this useEffect

  const handleSearchByName = async (name) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([fetchCocktailsByName(name), delay(3000)]);
      setItems(data || []);
    } catch (error) {
      handleApiError(error, "Search by name failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByIngredient = async (ingredient) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        fetchCocktailsByIngredient(ingredient),
        delay(2000),
      ]);
      setItems(data || []);
    } catch (error) {
      handleApiError(error, "Search by ingredient failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const [data] = await Promise.all([fetchRandomCocktail(), delay(3000)]);
      setItems([data]);
    } catch (error) {
      handleApiError(error, "Fetching random cocktail failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeItem === "name") {
      handleSearchByName(inputValue);
    } else if (activeItem === "ingredient") {
      handleSearchByIngredient(inputValue);
    }
  };

  return (
    <>
      <section className="search-header">
        <h1>{isFavorites ? "Favourite recipes" : "Cocktail recipes"}</h1>
        {!isFavorites && (
          <>
            <SearchNavigation
              onSearchByNameClick={() => {
                setPlaceholder("e.g. mojito");
                setActiveItem("name");
                setInputValue("");
              }}
              onSearchByIngredientClick={() => {
                setPlaceholder("e.g. gin");
                setActiveItem("ingredient");
                setInputValue("");
              }}
              onRandomDrink={handleRandom}
              onGetAll={getAll}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            <SearchBar
              onSearch={handleSearch}
              inputRef={searchInputRef}
              placeholder={placeholder}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </>
        )}
      </section>

      {!isFavorites && (
        <section className="cocktail-list-container">
          {loading ? (
            <Loader />
          ) : (
            <CocktailsList
              items={items}
              onDelete={(deletedId) =>
                setItems((prev) => prev.filter((item) => item._id !== deletedId))
              }
            />
          )}
        </section>
      )}
    </>
  );
};

export default DynamicHeader;
