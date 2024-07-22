import React from 'react';
import './Modal.css';

const Modal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img src={'http://localhost/cookcanvas/backend' + recipe.image} alt={recipe.title} className="modal-image" />
        <div className="modal-info">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Steps:</p>
          <ul>
            {recipe.steps.map((step) => (
              <li key={step.step_number}>{step.description}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
