import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={'http://localhost/cookcanvas/backend' + recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p className="truncate">{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
