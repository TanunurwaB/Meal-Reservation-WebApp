const sql = require('mssql');
const config = {
  user: 'supreme',
  password: '2468',
  server: 'supremeacquinta',
  database: 'Reservations',
  options: {
      encrypt: true, // Set to true if you want to use encryption
      trustServerCertificate: true // Trust self-signed certificates
  }
};

const connectDB = async () => {
    try {
      await sql.connect(config);
      console.log('Connected to Microsoft SQL Server');
    } catch (err) {
      console.error('Database connection error:', err);
    }
  };
  
  module.exports = connectDB;
  