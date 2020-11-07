require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "hobby_app",
});

connection.connect();

//select all these columns
// from this table of users
// then inner join xref_user_hobbies with users ON user_id(from xref_user_hobbies), users.id matches that
// then inner join the table of hobbies on hobbies.id (id inside of hobbies), join that with table of xref_user_hobbies, which has a matching hobby_id inside of it
//where users first name = 'mike'
connection.query(
   `
    SELECT  
        users.id AS user_id,
        users.first_name,
        users.last_name,
        hobbies.id AS hobby_id,
        hobbies.name AS hobby_name
    FROM 
        users
    INNER JOIN 
        xref_user_hobbies ON user_id = users.id
    INNER JOIN 
        hobbies ON hobbies.id = xref_user_hobbies.hobby_id 
    WHERE 
        users.first_name = 'mike'
    `,
   (err, res) => {
      if (err) {
         console.log(err);
      } else {
         console.log(res);
      }
   }
);

connection.end();
