import React, { useState } from "react";
import { postNewCocktail } from "../../api";
import "./AddCocktailForm.css";

const AddCocktailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    alcoholic: false,
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cocktailData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
    };

    try {
      const response = await postNewCocktail(cocktailData);
      if (response.cocktail) {
        setMessage("Cocktail added successfully!");
        setFormData({
          name: "",
          ingredients: "",
          instructions: "",
          alcoholic: false,
          image: "",
        });
      } else {
        setMessage("Failed to add cocktail.");
      }
    } catch (error) {
      console.error("Error submitting cocktail:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="add-form-container">
      <h2>Add New Cocktail</h2>
      {message && <p className="form-message" aria-live="polite">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Cocktail Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="ingredients">Ingredients (comma-separated)</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="alcoholic">
          <input
            id="alcoholic"
            type="checkbox"
            name="alcoholic"
            checked={formData.alcoholic}
            onChange={handleChange}
          />
          Alcoholic
        </label>

        <button type="submit">Add Cocktail</button>
      </form>
    </div>
  );
};

export default AddCocktailForm;
