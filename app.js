const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./auth');

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));