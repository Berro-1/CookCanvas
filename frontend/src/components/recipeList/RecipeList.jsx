import React from 'react';
import RecipeCard from '../recipeCard/RecipeCard';

const RecipeList = ({ recipes, onCardClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe_id} recipe={recipe} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default RecipeList;
