import { Link } from 'react-router-dom';
import './App.css'
import recipesData from './data/recipes.json'

function Header() {
  return (
    <nav className="Header">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/userList">Go to user</Link></li>
      </ul>
    </nav>
  );
}
export { Header };

function App() {
  return (
    <>
      <h1> Ghezali Mohamed </h1>
      <div className="recipes-grid">

        {recipesData.recipes.map((recipe) =>
          <div className="recipe-card" key={recipe.id}>
            <h2>
              <Link to={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Link>
            </h2>

            <p>Temps de préparation : {recipe.prepTimeMinutes} minutes</p>

            <img src={recipe.image} />
          </div>
        )}

      </div>
    </>
  );

}

export default App