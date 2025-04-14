import React, { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    // Load favorites from localStorage on first render
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (item) => {
    setFavourites((prevFavourites) => [...prevFavourites, item]);
  };

  const removeFromFavourites = (itemId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((item) => item._id !== itemId)
    );
  };

  const clearAllFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        clearAllFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
