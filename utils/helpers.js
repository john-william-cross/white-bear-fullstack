module.exports = {
   toJson(data) {
      return JSON.stringify(data);
   }, //converts everything to string

   toSafeParse(str) {
      try {
         //try to parse it
         JSON.parse(str);
      } catch (err) {
         //but if there's an error, don't crash the app; catch the error, and return the string.
         console.log(err);
         return str;
      }
      return JSON.parse(str);
   },
};
