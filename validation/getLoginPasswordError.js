const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = function getLoginPasswordError(password, email) {
   if (password === "") {
      return "Please enter your password.";
   }
   if (checkIsValidUser(email, password) === false) {
      return "The email and password combination you entered is invalid.";
   }
   return "";
};

function checkIsValidUser(email, password) {
   // get the user by email address
   return db
      .query(selectUserByEmail, email)
      .then((users) => {
         console.log(users);
         const user = users[0];
         bcrypt.compare(password, user.password, function (err, result) {
            // result == true
         });
      })
      .catch((err) => {
         console.log(err);
      });
   // compare user.password with password
   // if a match, return true, else false
}
