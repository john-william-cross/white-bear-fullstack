// This file represents the users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const jwt = require("jsonwebtoken");

// @route        POST api/v1/users
// @desc         Create a new user
// @access       PUBLIC
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body; // grab these vars from req.body
   const emailError = await getSignUpEmailError(email); // check for signUpEmailError (await because it's a db query), if error return string else return blank string
   const passwordError = getSignUpPasswordError(password, email); // check for passwordError, if error return string else return blank string
   let dbError = ""; // if no dbError return blank string
   if (emailError === "" && passwordError === "") {
      // if no email or password error, now we can post it to db
      const user = {
         // create the user
         id,
         email,
         password: await toHash(password), // await hash function because it takes a moment to has password
         created_at: createdAt,
      }; // now we have a user object ready to insert into the db

      db.query(insertUser, user) // run the db.query insertUser and pass it the user
         .then(() => {
            // then if there's a success
            db.query(selectUserById, id) // select use by the id we have from above
               .then((users) => {
                  // we get an array of users
                  const user = users[0]; // get just the one user
                  res.status(200).json({
                     // give it this json object with id, email, and createdAt, set to values below from db
                     id: user.id,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               .catch((err) => {
                  // if error in selecting user by id, catch it and log the error
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError }); // respond with dbError: dbError
               });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`; // if there's an error inserting the user, set dbError to err.code and err.sqlMessage
            res.status(400).json({ dbError }); // respond with the dbError
         });
   } else {
      res.status(400).json({ emailError, passwordError }); // else return with status of 400, email and password errors return as strings with that (those) particular errors if they have one
   }
});

// @route        POST api/v1/users/auth
// @desc         Check this user against the db via email and password
// @access       PUBLIC

router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);
   console.log({ emailError, passwordError });
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      db.query(selectUserByEmail, email)
         .then((users) => {
            const user = users[0];
            res.status(200).json({
               id: user.id,
               email: user.email,
               createdAt: user.created_at,
            });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({ emailError, passwordError });
   }
});

module.exports = router;
