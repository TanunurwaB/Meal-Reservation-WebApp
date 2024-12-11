const express = require('express');
const sql = require('mssql');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`INSERT INTO Users (email, password) VALUES (${email}, ${password})`;
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`SELECT * FROM Users WHERE email = ${email} AND password = ${password}`;
    if (result.recordset.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
 