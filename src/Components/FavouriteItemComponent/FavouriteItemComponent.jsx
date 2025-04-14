import React from "react";
import { useFavourites } from "../FavouritesContext/FavouritesContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const FavouriteItemComponent = ({ item }) => {
  const { removeFromFavourites } = useFavourites();

  return (
    <div className="productCartContainer">
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="iconContainer">
        <h2>{item.name}</h2>
        <button
          className="iconDiv"
          onClick={() => removeFromFavourites(item._id)}
          aria-label={`Remove ${item.name} from favorites`}
        >
          <FontAwesomeIcon
            icon={faHeartSolid}
            size="2x"
            color="red"
            className="heart"
          />
        </button>
      </div>
      <p>{item.alcoholic ? "Alcoholic" : "Non-Alcoholic"}</p>

      {item.instructions && <p>{item.instructions}</p>}

      {item.ingredients && Array.isArray(item.ingredients) && (
        <ul>
          {item.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouriteItemComponent;
