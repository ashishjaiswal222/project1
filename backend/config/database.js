// config/database.js
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Adjust based on your database (e.g., 'mysql', 'sqlite')
  dialectOptions: { ssl: false } // Disable SSL for local development
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;