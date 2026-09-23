import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Recipe, RecipesResponse } from "./types/recipe";
import "./App.css";

interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface QuotesResponse {
  quotes: Quote[];
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState("");

  useEffect(() => {
    axios
      .get<RecipesResponse>("https://dummyjson.com/recipes")
      .then((response) => setRecipes(response.data.recipes))
      .catch(() => setError("Impossible de charger les recettes."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get<QuotesResponse>("https://dummyjson.com/quotes")
      .then((response) => {
        const quotes = response.data.quotes;
        const currentDay = new Date().getDate();
        const selectedQuote =
          currentDay === 31
            ? quotes[Math.floor(Math.random() * quotes.length)]
            : quotes.find((item) => item.id === currentDay);

        setQuote(selectedQuote ?? null);
      })
      .catch(() => setQuoteError("Impossible de charger la citation."))
      .finally(() => setQuoteLoading(false));
  }, []);

  return (
    <main className="recipes-page">
      <div className="page-heading">
        <p className="eyebrow">Cuisine du quotidien</p>
        <h1>Les recettes</h1>
        <p>Explorez des idées simples à préparer et à cuisiner.</p>
      </div>

      <section className="quote-widget" aria-labelledby="quote-title">
        <p className="eyebrow">Inspiration</p>
        <h2 id="quote-title">Citation du jour</h2>
        {quoteLoading && <p className="quote-status">Chargement de la citation...</p>}
        {quoteError && <p className="quote-status error-message">{quoteError}</p>}
        {!quoteLoading && !quoteError && quote && (
          <blockquote>
            <p>“{quote.quote}”</p>
            <cite>— {quote.author}</cite>
          </blockquote>
        )}
      </section>

      {loading && <p className="status-message">Chargement des recettes...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <article className="recipe-card" key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
                <img src={recipe.image} alt={recipe.name} />
                <div className="recipe-card-content">
                  <h2>{recipe.name}</h2>
                  <div className="recipe-times">
                    <span>Préparation: {recipe.prepTimeMinutes} min</span>
                    <span>Cuisson: {recipe.cookTimeMinutes} min</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default App