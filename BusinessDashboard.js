// BusinessDashboard.js
import React, { useState, useEffect } from 'react';
import { fetchMeals, addMeal, deleteMeal } from '../api';
import './BusinessDashboard.css'; // Import the CSS file
import axios from 'axios';


const BusinessDashboard = ({ userEmail }) => {
  /*const [setBookings] = useState([]);*/
  const [meals, setMeals] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');

  /*useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await getBookings(userEmail);
        setBookings(response);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookingsData();
  },);*/

  useEffect(() => {
    const fetchMealsData = async () => {
      try {
        const response = await fetchMeals();
        setMeals(response);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMealsData();
  }, []);

  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservationsData();
  }, []);

  const handleAddMeal = async () => {
    // Validation
    if (!newMeal.name || !newMeal.description || !newMeal.price || !newMeal.category_id || !newMeal.imageUrl) {
      setError('All fields are required.');
      return;
    }
    if (isNaN(newMeal.price) || parseFloat(newMeal.price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }
    if (isNaN(newMeal.category_id) || parseInt(newMeal.category_id) <= 0) {
      setError('Category ID must be a positive integer.');
      return;
    }

    setError(''); // Clear previous errors

    try {
      const response = await addMeal({ ...newMeal });
      setMeals([...meals, response]);
      setNewMeal({ name: '', description: '', price: '', category_id: '', imageUrl: '' });
      alert('Meal added successfully!');
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Failed to add meal.');
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await deleteMeal(mealId); // Call the delete function with mealId
      setMeals(meals.filter(meal => meal.id !== mealId)); // Update the state to remove the deleted meal
      alert('Meal deleted successfully!');
    } catch (error) {
      console.error('Error deleting meal:', error);
      alert('Failed to delete meal.');
    }
  };

  return (
    <div className="business-dashboard">
      <h1 className="dashboard-title">Meals available for booking</h1>
      <div className="meals-list">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
            <p>Price: ${meal.price}</p>
            <p>Category ID: {meal.category_id}</p>
            <img src={require(`../components/${meal.imageUrl}`)} alt={meal.name}/>
            <button onClick={() => handleDeleteMeal(meal.id)}>Delete Meal</button>
          </div>
        ))}
      </div>
      <div className='reservations-tab'>
      <h2>Reservations</h2>
        {reservations.map((reservation) => (
          <div key={reservation.reservationId} className="reservation-card">
            <h3>{reservation.mealName}</h3>
            <p>User: {reservation.username}</p>
            <p>Quantity: {reservation.quantity}</p>
            <p>Booking Date: {new Date(reservation.bookingDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <h2>Add New Meal</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='addmeals-card'>
        <input
          type="text"
          placeholder="Meal Name"
          value={newMeal.name}
          onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Meal Description"
          value={newMeal.description}
          onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMeal.price}
          onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Category ID"
          value={newMeal.category_id}
          onChange={(e) => setNewMeal({ ...newMeal, category_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newMeal.imageUrl}
          onChange={(e) => setNewMeal({ ...newMeal, imageUrl: e.target.value })}
        />
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>
    </div>
  );
};

export default BusinessDashboard;