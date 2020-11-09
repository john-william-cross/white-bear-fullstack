// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");
// @route       GET api/v1/users
//@desc         Get a valid user via email and password
//@access       PUBLIC

router.get("/", (req, res) => {
   db.query(selectUser("mike@gmail.com", "replace_me"))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;

/*
starting on line 11: 
- when this router is called from our server, meaning we land on this page: "/api/v1/users", we're going to call that file
- when that file is called, it's going to use our database that we created (line 12),
call the query method on our database, which is going to open up a connection, and inside that connection to the database, it's going to pass the function selectUser (which is a query - see selectUser.js file), which takes in an email and password
- THEN, if we get something successful, we do all the other logic-- which is, get the individual user (line 14), console log the user, and then respond with the user

Next, if there' a db error, we can catch that error, log the error, and give it the stats of 400. 
*/
