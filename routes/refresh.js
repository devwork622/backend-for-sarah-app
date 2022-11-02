var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ryan_db"
});

router.post('/', function (req, res, next) {    

    con.connect(function (err) {
        if (err) console.log(err);

        var first_sql = `SELECT COUNT(ID) AS row_ct FROM refresh`;
        con.query(first_sql, function (err, result) {
            if (result[0].row_ct == 0) {
                con.query(`INSERT INTO refresh (first_time, second_time) VALUES ("${req.body.firstTime}", "${req.body.secondTime}")`, function (err, result, fields) {
                    if (err) console.log(err);
                    console.log(result);
                    con.query("SELECT * FROM refresh", function (err, result, fields) {
                        if (err) console.log(err);
                        console.log(result);
                        res.send(result);
                    });
                });
            }
            else {
                var getID_sql = `SELECT id FROM refresh`;
                con.query(getID_sql, function (err, result) {
                    var updatedId = result[0].id;
                    var sql = `UPDATE refresh SET first_time='${req.body.firstTime}', second_time='${req.body.secondTime}' WHERE id='${updatedId}'`;
                    con.query(sql, function (err, result) {
                        if (err) console.log(err);
                        console.log("1 record updated in users table");
                        con.query("SELECT * FROM refresh", function (err, result, fields) {
                            if (err) console.log(err);
                            console.log(result);
                            res.send(result);
                        });
                    });
                });
            }
        })

    });
});


router.get('/', function (req, res, next) {

    con.connect(function (err) {
        con.query("SELECT * FROM refresh", function (err, result, fields) {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        });
    });

});
module.exports = router;