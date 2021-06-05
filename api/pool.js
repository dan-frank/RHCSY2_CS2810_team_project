const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({
  host: config.DBHost,
  port: 5432,
  user: "team18",
  password: "root",
  database: "restaurant",
});

module.exports.pool = pool;
