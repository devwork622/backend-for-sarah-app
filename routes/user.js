var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sarah_app"
  });

  con.connect(function (err) {
    if (err) console.log(err);
    con.query("SELECT username, password FROM users LIMIT 1", function (err, result, fields) {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    });
  });

});

router.post('/', function (req, res, next) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sarah_app"
  });

  con.connect(function (err) {
    if (err) {
      console.log(err);
      console.log(err);
    }
    var first_sql = `SELECT COUNT(ID) AS row_ct FROM users`;
    con.query(first_sql, function (err, result) {      
      if (result[0].row_ct == 0) {        
        var sql = `INSERT INTO users (username, password) VALUES ("${req.body.username}", "${req.body.password}")`;
        con.query(sql, function (err, result) {
          if (err) console.log(err);
          console.log("1 record inserted in users table");
          res.send('respond with a resource');
        });
      }
      else {
        var getID_sql = `SELECT id FROM users`;
        con.query(getID_sql, function (err, result) {          
          var updatedId = result[0].id;
          var sql = `UPDATE users SET username='${req.body.username}', password='${req.body.password}' WHERE id='${updatedId}'`;
          con.query(sql, function (err, result) {
            if (err) console.log(err);
            console.log("1 record updated in users table");
            res.send('respond with a resource');
          });
        });
      }
    });
  });
});



module.exports = router;
