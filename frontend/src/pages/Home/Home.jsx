import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import NavMenu from '../../components/navMenu/NavMenu';
import RecipeList from '../../components/recipeList/RecipeList';
import Modal from '../../components/modal/Modal';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost/cookcanvas/backend/recipes/getAll.php');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Header />
      <SearchBar />
      <NavMenu />
      <div className="content">
        <h2>Popular Recipes</h2>
        <RecipeList recipes={recipes} onCardClick={handleCardClick} />
      </div>
      {selectedRecipe && <Modal recipe={selectedRecipe} onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
