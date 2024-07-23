import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = ({ recipeId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://localhost/cookcanvas/backend/rating/getRating.php?recipe_id=${recipeId}&user_id=${userId}`);
        if (response.data.status === 'success') {
          setRating(parseFloat(response.data.rating));
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [recipeId, userId]);

  const handleRating = async (rate) => {
    try {
      const response = await axios.post('http://localhost/cookcanvas/backend/rating/rateRecipe.php', {
        recipe_id: recipeId,
        user_id: userId,
        rating: rate,
      });

      if (response.data.status === 'success') {
        setRating(rate);
      } else {
        alert('Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
