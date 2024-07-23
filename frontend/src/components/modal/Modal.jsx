import React from 'react';
import { jsPDF } from 'jspdf';
import './Modal.css';

const Modal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const downloadPdf = () => {
    const doc = new jsPDF();
    
    doc.text(recipe.title, 10, 10);
    doc.text(recipe.description, 10, 20);

    doc.text('Ingredients:', 10, 30);
    recipe.ingredients.forEach((ingredient, index) => {
      doc.text(ingredient, 10, 40 + index * 10);
    });

    doc.text('Steps:', 10, 50 + recipe.ingredients.length * 10);
    recipe.steps.forEach((step, index) => {
      doc.text(`${index + 1}. ${step.description}`, 10, 60 + recipe.ingredients.length * 10 + index * 10);
    });

    doc.save(`${recipe.title}.pdf`);
  };

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
          <button className="download-button" onClick={downloadPdf}>Download as PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
