const jwt = require("jsonwebtoken");

module.exports = function validateJwt(req, res, next) {
   const accessToken = req.header("x-auth-token");
};
