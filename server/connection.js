const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const db = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
