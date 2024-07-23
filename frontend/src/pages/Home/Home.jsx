import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import NavMenu from '../../components/navMenu/NavMenu';
import RecipeList from '../../components/recipeList/RecipeList';
import Modal from '../../components/modal/Modal';
import { createFilter } from 'react-search-input';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const KEYS_TO_FILTERS = ['title', 'description', 'ingredients', 'steps.description'];

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

  const filteredRecipes = recipes.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    console.log(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header />
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <NavMenu />
      <div className="content">
        <h2>Popular Recipes</h2>
        <div className="popular-recipes">
          <RecipeList recipes={filteredRecipes} onCardClick={handleRecipeClick} />
        </div>
      </div>
      {selectedRecipe && <Modal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
};

export default Home;
