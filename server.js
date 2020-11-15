const express = require("express");
const app = express();
const path = require("path");
// var cors = require("cors");

// app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3044;
app.listen(port, () => {
   console.log(`Server Running at http://localhost:${port}`);
});

// this server file is going to be a list of all our routes, then it's going to start the server that's listening on that port
// when the route on line 4 -- app.use("/api/v1/users", require("./api/v1/users")); -- what's inside of the users.js file will run.... which is, it will open up a database connection (db, defined in db.js), run the query method on it, then selectUser based off of the requirements in selectUser.js. It's returned as JSON, which is when the user is able to access it inside their web browser

// if you needed any other info from the user, i.e. gender, username, etc. return that as well because it will
// need to be stored inside of the redux state
