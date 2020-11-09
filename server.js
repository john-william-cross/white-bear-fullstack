require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

connection.query(selectUser("mike@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      //   const user = toSafeParse(toJson(res))[0]; //res means response
      const jsonRes = toJson(res);
      console.log(jsonRes);
      const parsedRes = toSafeParse(jsonRes);
      const firstObj = parsedRes[0];
      const user = firstObj;
      console.log(user);
   }
});

connection.end();

// if you needed any other info from the user, i.e. gender, username, etc. return that as well because it will
// need to be stored inside of the redux state
