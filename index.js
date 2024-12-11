const express = require('express');
const cors = require('cors');
const mealsRouter = require('./meals'); // Path to meals
const bookingsRouter = require('./bookings'); // Path to bookings
const loginRouter = require('./login'); // Path to login
const registerRouter = require('./register'); // Path to register
const businessDashboardRouter = require('./routes/businessDashboard'); // Adjusted path to business dashboard
const userProfileRooter = require('./profile');
const reservations = require('./reservations');
const addmeals = require('./addmeals');
const deletemeal = require('./deletemeal');


const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin (your React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials (if needed)
}));

// Use the meals, bookings, login, registration, and business dashboard routes
app.use('/api/meals', mealsRouter);
app.use('/api/book', bookingsRouter);
app.use('/api/login', loginRouter); // Use the login route
app.use('/api/register', registerRouter); // Use the registration route
app.use('/api/business', businessDashboardRouter); // Use the business dashboard route
app.use('/api/user/profile', userProfileRooter);
app.use('/api/reservations', reservations);
app.use('/api/add', addmeals);
app.use('/api/delete', deletemeal);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});