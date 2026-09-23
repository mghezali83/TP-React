import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "./NotFound";

import type { RootState } from "../store/store";
import {
    addFavorite,
    removeFavorite,
} from "../store/reducers/favorites";

interface Recipe {
    id: number;
    name: string;
    image: string;
    ingredients: string[];
    instructions: string[];
}

function RecipeNames() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        axios
            .get(`https://dummyjson.com/recipes/${id}`)
            .then((response) => {
                setRecipe(response.data);
            })
            .catch(() => {
                setNotFound(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (notFound || !recipe) {
        return <NotFound />;
    }

    const recipeId = recipe.id;

    const isFavorite = favorites.includes(recipeId);

    function handleFavorite() {
        if (isFavorite) {
            dispatch(removeFavorite(recipeId));
        } else {
            dispatch(addFavorite(recipeId));
        }
    }

    return (
        <>
            <h1>{recipe.name}</h1>

            <button onClick={handleFavorite}>
                {isFavorite
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"}
            </button>

            <div className="recipe-image">
                <img src={recipe.image} alt={recipe.name} />
            </div>

            <h2>Ingredients</h2>

            <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>

            <h2>Instructions</h2>

            <ol>
                {recipe.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                ))}
            </ol>
        </>
    );
}

export default RecipeNames;