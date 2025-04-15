import React from "react";
import "../CocktailListComponent/CocktailList.css";
import FavouriteItemComponent from "../FavouriteItemComponent/FavouriteItemComponent.jsx";
import { useFavourites } from "../FavouritesContext/FavouritesContext";

const FavouritesList = () => {
  const { favourites } = useFavourites();

  return (
    <div className="cocktail-grid">
      {favourites.length > 0 ? (
        favourites.map((item) => (
          <FavouriteItemComponent key={item._id} item={item} />
        ))
      ) : (
        <p style={{ textAlign: "center", width: "100%", fontFamily: "var(--base-font)" }}>
          No favorites yet.
        </p>
      )}
    </div>
  );
};

export default FavouritesList;
