const { Pool } = require('pg');
// you can also use the online posrgres database: elephantSQL
//https://www.youtube.com/watch?v=BuJj4LCWP_4
//#postgres://username:password@hostname:port/database
const config = require('./config');

const pool = new Pool({
  host: config.elephantHost,
  user: config.elephantUser,
  password: config.elephantPassword,
  database: config.elephantDatabase,
  port: config.elephantPort,
});

module.exports = pool;