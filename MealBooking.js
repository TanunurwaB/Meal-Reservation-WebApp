//MealBooking.js

import React, { useState, useEffect } from 'react';
import { fetchMeals, bookMeal } from '../api'; // Import the necessary API functions
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const MealBooking = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useAuth(); // Get the user's email from context

  useEffect(() => {
    const fetchMealsData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetchMeals(); // Fetch meals from the API
        setMeals(response); // Set meals directly if response is already the data
      } catch (error) {
        console.error('Error fetching meals:', error);
        setError('Failed to fetch meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMealsData();
  }, []);

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleBookMeal = async () => {
    if (!selectedMeal) {
      alert('Please select a meal to book.');
      return;
    }

    // Prepare user credentials for booking
    const userData = {
      email: userEmail, // Use the authenticated user's email
      mealId: selectedMeal.id
    };

    try {
      const response = await bookMeal(userData); // Pass user data to bookMeal
      if (response.status === 201) {
        alert('Meal booked successfully!');
        setSelectedMeal(null); // Clear selection after booking
      } else {
        alert('Meal booking failed!');
      }
    } catch (error) {
      console.error('Error booking meal:', error);
      alert('An error occurred while booking the meal. Please try again.');
    }
  };

  return (
    <div>
      <h1>Meal Booking</h1>
      {loading && <p>Loading meals...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} onClick={() => handleSelectMeal(meal)} style={{ cursor: 'pointer' }}>
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
          </li>
        ))}
      </ul>

      {selectedMeal && (
        <div>
          <h2>Selected Meal: {selectedMeal.name}</h2>
          <p>{selectedMeal.description}</p>
          <button onClick={handleBookMeal}>Book Meal</button>
        </div>
      )}
    </div>
  );
};

export default MealBooking;