import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { RootState } from "../store/store";

interface Recipe {
    id: number;
    name: string;
    image: string;
}

function Favorites() {
    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (favorites.length === 0) {
            setRecipes([]);
            return;
        }

        Promise.all(
            favorites.map((id) =>
                axios.get(`https://dummyjson.com/recipes/${id}`)
            )
        ).then((responses) => {
            const recipesData = responses.map(
                (response) => response.data
            );

            setRecipes(recipesData);
        });
    }, [favorites]);

    return (
        <>
            <h1>Mes Favoris</h1>

            <p>Nombre de favoris : {favorites.length}</p>

            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        width="150"
                    />

                    <h2>{recipe.name}</h2>

                    <Link to={`/recipes/${recipe.id}`}>
                        Voir la recette
                    </Link>
                </div>
            ))}

            {favorites.length === 0 && (
                <p>Aucune recette dans vos favoris.</p>
            )}
        </>
    );
}

export default Favorites;