import { useParams } from "react-router-dom";
import recipesData from "../data/recipes.json";
import NotFound from "./NotFound";

function RecipeNames() {
    let { id } = useParams();

    let recipe = recipesData.recipes.find((recipe) => {
        return recipe.id.toString() === id;
    });
    if (!recipe) {
        return <NotFound />;
    }
    return (
        <>
            <h1>{recipe?.name}</h1>

            <div className="recipe-image">
                <img src={recipe?.image} />
            </div>

            <h2>Ingredients</h2>

            <ul>
                {recipe?.ingredients.map((ingredient) =>
                    <li>{ingredient}</li>
                )}
            </ul>

            <h2>Instructions</h2>

            <ol>
                {recipe?.instructions.map((instruction) =>
                    <li>{instruction}</li>
                )}
            </ol>
        </>
    );
}

export default RecipeNames;