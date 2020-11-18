module.exports = function getLoginPasswordError(password, email) {
   if (password === "") {
      return "Please enter your password.";
   }
   return "";
};
