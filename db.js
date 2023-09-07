const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
})

module.exports = pool;