module.exports = function getSignUpPasswordError(password, email) {
   const uniqChars = [...new Set(password)];

   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters.";
   }
   if (this.checkHasLocalPart(password, email)) {
      return "For your safety, your password cannot contain your email address.";
   }
   if (uniqChars.length < 3) {
      return "For your safety, your password must contain at least 3 unique characters.";
   }
};

function checkHasLocalPart(password, email) {
   const localPart = email.split("@")[0];
   if (localPart === "") return false;
   else if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
