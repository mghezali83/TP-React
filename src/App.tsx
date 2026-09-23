import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        setRecipes(response.data.recipes);
      });
  }, []);

  return (
    <>
      <h1>Recipes</h1>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.name} />

              <h2>{recipe.name}</h2>

              <p>
                Préparation : {recipe.prepTimeMinutes} min
              </p>

              <p>
                Cuisson : {recipe.cookTimeMinutes} min
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;