export interface Recipe {
    id: number;
    name: string;
    image: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    ingredients: string[];
    instructions: string[];
}

export interface RecipesResponse {
    recipes: Recipe[];
}