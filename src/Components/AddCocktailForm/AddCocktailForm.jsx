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
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Cocktail Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <label>
          <input
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
