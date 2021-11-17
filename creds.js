// CREATE TABLE demo(
//   key integer PRIMARY KEY,
//   description VARCHAR(255)  
// );
// only two attributes in the table: todo_id and description
const { Pool } = require('pg');
// you can also use the online posrgres database: elephantSQL
//https://www.youtube.com/watch?v=BuJj4LCWP_4
//#postgres://username:password@hostname:port/database

const pool = new Pool({
  host: "fanny.db.elephantsql.com",
  user: "aydcjkbo",
  password: "GKV6YW6f2jKnjvzYzMN5lyB7sSLiy6bx",
  database: "aydcjkbo",
  port: "5432",
});

module.exports = pool;
