const API_BASE_URL = "http://localhost:5050/api/cocktails";

export const fetchAllCocktails = async () => {
  const response = await fetch(API_BASE_URL);
  return await response.json();
};

export const fetchCocktailsByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}?name=${name}`);
  return await response.json();
};

export const fetchCocktailsByIngredient = async (ingredient) => {
  const response = await fetch(`${API_BASE_URL}?ingredient=${ingredient}`);
  return await response.json();
};

export const fetchRandomCocktail = async () => {
  const response = await fetch(`${API_BASE_URL}/random`);
  return await response.json();
};

export const postNewCocktail = async (cocktailData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cocktailData),
  });
  return await response.json();
};

export const deleteCocktail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  return await response.json();
};
