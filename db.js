require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

const db = mysql.createPool({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

//https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
db.query = nodeUtil.promisify(db.query);

module.exports = db;

// we moved database stuff into its own file called db.js
// we're using connection pooling now.
// we export that so we can use it inside of users resource or any other resources
// to use it we import it like anything else (see line 4 of users.js)
