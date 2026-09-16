import { Link } from 'react-router-dom';
import './App.css'
import HelloWorld from './components/HelloWorld'
import React, { useState } from 'react';
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
      {recipesData.recipes.map((recipe) =>
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                      <Link to={`/recipes/${recipe.id}`}>
                        {recipe.name}
                      </Link>
                    <p>Temps de préparation : {recipe.prepTimeMinutes} minutes</p>
                    <img src={recipe.image} />
                </div>
            )}
    </>
  );

} 

export default App