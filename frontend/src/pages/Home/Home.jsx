import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import RecipeList from '../../components/recipeList/RecipeList';
import Modal from '../../components/modal/Modal';
import CreateRecipe from '../../components/createRecipe/CreateRecipe1';
import { createFilter } from 'react-search-input';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCreateRecipeOpen, setIsCreateRecipeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const KEYS_TO_FILTERS = ['title'];

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
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const openCreateRecipe = () => {
    setIsCreateRecipeOpen(true);
  };

  const closeCreateRecipe = () => {
    setIsCreateRecipeOpen(false);
  };

  const handleRecipeCreated = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header />
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <button className="create-recipe-button" onClick={openCreateRecipe}>Create Recipe</button>
      <div className="content">
        <h2>Popular Recipes</h2>
        <div className="popular-recipes">
          <RecipeList recipes={filteredRecipes} onCardClick={handleRecipeClick} />
        </div>
      </div>
      {selectedRecipe && <Modal recipe={selectedRecipe} onClose={closeModal} />}
      {isCreateRecipeOpen && <CreateRecipe onClose={closeCreateRecipe} onRecipeCreated={handleRecipeCreated} />}
    </div>
  );
};

export default Home;
