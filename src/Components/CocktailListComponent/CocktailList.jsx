import { useFavourites } from "../FavouritesContext/FavouritesContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { deleteCocktail } from "../../api.js"; 
import "../CocktailListComponent/CocktailList.css";

const CocktailsList = ({ items = [], onDelete }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useFavourites();
  const cocktailsArray = Array.isArray(items) ? items : [items];

  const toggleFavourite = (drink) => {
    favourites.some((fav) => fav._id === drink._id)
      ? removeFromFavourites(drink._id)
      : addToFavourites(drink);
  };

  return (
    <section>
      <div className="cocktail-grid">
        {cocktailsArray.map((drink) => (
          <CocktailCard
            key={drink._id}
            drink={drink}
            isFavourite={favourites.some((fav) => fav._id === drink._id)}
            toggleFavourite={toggleFavourite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

const CocktailCard = ({ drink, isFavourite, toggleFavourite, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteCocktail(drink._id); // ✅ backend DELETE call
      if (onDelete) {
        onDelete(drink._id); // ✅ update UI
      }
    } catch (error) {
      console.error("Failed to delete cocktail:", error);
    }
  };

  return (
    <div className="productCartContainer">
      <img
        src={drink.image}
        alt={`A cocktail called ${drink.name}`}
        style={{ width: "100%", height: "auto" }}
      />

      <div className="iconContainer">
        <h2>{drink.name}</h2>
        <button
          className="iconDiv"
          onClick={() => toggleFavourite(drink)}
          aria-label={`Toggle favourite for ${drink.name}`}
        >
          <FontAwesomeIcon
            icon={isFavourite ? faHeartSolid : faHeartRegular}
            size="2x"
            color="red"
          />
        </button>
      </div>

      <p className="drink-type">
        {drink.alcoholic ? "Alcoholic" : "Non-Alcoholic"}
      </p>

      {drink.instructions && <p>{drink.instructions}</p>}

      {drink.ingredients && Array.isArray(drink.ingredients) && (
        <ul>
          {drink.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      )}

      {onDelete && (
        <button
          className="iconDiv delete-icon"
          onClick={handleDelete}
          aria-label={`Delete ${drink.name}`}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="2x"
            color="#FF3904"
            className="trash"
          />
        </button>
      )}
    </div>
  );
};

export default CocktailsList;
