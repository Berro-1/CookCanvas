import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeCard = ({ recipe, onClick }) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost/cookcanvas/backend/rating/getAvgRating.php?recipe_id=${recipe.recipe_id}`);
        if (response.data.status === 'success') {
          setAverageRating(parseFloat(response.data.average_rating));
        } else {
          setAverageRating(null);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
        setAverageRating(null);
      }
    };

    fetchAverageRating();
  }, [recipe.recipe_id]);

  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <img src={`http://localhost/cookcanvas/backend${recipe.image}`} alt={recipe.title} className="recipe-image" />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <p>Average Rating: {averageRating !== null ? averageRating.toFixed(1) : 'No ratings yet'}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
