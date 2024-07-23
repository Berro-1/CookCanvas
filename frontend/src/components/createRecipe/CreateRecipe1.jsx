import React, { useState } from 'react';
import axios from 'axios';
import './createRecipe.css';

const CreateRecipe = ({ onClose, onRecipeCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [image, setImage] = useState(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('user_id'); // Get the user ID from local storage

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('user_id', userId); // Include the user ID in the form data
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    steps.forEach((step, index) => {
      formData.append(`steps[${index}]`, step);
    });
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost/cookcanvas/backend/recipes/create.php', formData);
      if (response.data.status === 'success') {
        onRecipeCreated(response.data.recipe);
        onClose();
      } else {
        console.error('Error creating recipe:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h3 className="form-title">Create Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
            ))}
            <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
          </div>
          <div className="form-group">
            <label>Steps</label>
            {steps.map((step, index) => (
              <textarea
                key={index}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              ></textarea>
            ))}
            <button type="button" onClick={handleAddStep}>Add Step</button>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="submit-button">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
