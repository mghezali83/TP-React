import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import type { Recipe } from "../types/recipe";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get<Recipe>(`https://dummyjson.com/recipes/${id}`)
            .then((response) => setRecipe(response.data))
            .catch(() => setError("Impossible de charger cette recette."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <p className="status-message">Chargement de la recette...</p>;
    }

    if (error || !recipe) {
        return (
            <main className="recipe-detail status-message error-message">
                <p>{error || "Recette introuvable."}</p>
                <Link to="/">Retour aux recettes</Link>
            </main>
        );
    }

    return (
        <main className="recipe-detail">
            <Link to="/" className="back-link">Retour aux recettes</Link>
            <div className="recipe-detail-header">
                <img src={recipe.image} alt={recipe.name} />
                <div>
                    <p className="eyebrow">Fiche recette</p>
                    <h1>{recipe.name}</h1>
                    <div className="recipe-times detail-times">
                        <span>Préparation: {recipe.prepTimeMinutes} min</span>
                        <span>Cuisson: {recipe.cookTimeMinutes} min</span>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-content">
                <section>
                    <h2>Ingrédients</h2>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Instructions</h2>
                    <ol className="instructions-list">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={`${index}-${instruction}`}>{instruction}</li>
                        ))}
                    </ol>
                </section>
            </div>
        </main>
    );
}

export default RecipeDetail;