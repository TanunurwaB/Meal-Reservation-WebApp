const express = require('express');
const sql = require('mssql');
const app = express.Router();
const connectDB = require('./config'); // Use the same connectDB function

// Middleware for parsing JSON bodies
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        await connectDB(); // Use the connectDB function to connect to the database
        console.log("Connected to Database Entity successfully");

        const result = await sql.query`SELECT * FROM Meals`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ message: 'Error fetching meals' });
    }
});

module.exports = app;