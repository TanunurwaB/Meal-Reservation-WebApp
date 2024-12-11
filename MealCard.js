import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import './MealCard.css'; // Ensure you have a CSS file for styling

const MealCard = ({ meal, onSelect }) => {
  return (
    <div className="meal-card" onClick={() => onSelect(meal)}>
      <div className="meal-image">
        <img src={require(`../components/${meal.imageUrl}`)} alt={meal.name} />
      </div>
      <div className="meal-details">
        <h3>{meal.name}</h3>
        <p>{meal.description}</p> {/* Display the meal description */}
        <p className="meal-price">${meal.price}</p>
        <button className="select-button">
          <FontAwesomeIcon icon={faUtensils} /> Select
        </button>
      </div>
    </div>
  );
};

export default MealCard;