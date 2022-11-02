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
        con.query(`INSERT INTO alerts (name, first_date, second_date, type) VALUES ("${req.body.alertName}", "${req.body.firstDate}", "${req.body.secondDate}", "${req.body.alertType}")`, function (err, result, fields) {
            if (err) console.log(err);
            console.log(result);
            con.query("SELECT * FROM alerts", function (err, result, fields) {
                if (err) console.log(err);
                console.log(result);
                res.send(result);
            });
        });
    });
});


router.get('/', function (req, res, next) {    
    con.connect(function (err) {        
        con.query("SELECT * FROM alerts", function (err, result, fields) {
            if (err) console.log("alert error----", err);
            res.send(result);
        });
    });
});

router.delete('/delete-alert:id', function (req, res, next) {
   
    con.connect(function (err) {
        if (err) console.log(err);
        con.query(`DELETE FROM alerts where id=${req.params.id}`, function (err, result, fields) {
            if (err) console.log(err);
            console.log(result);
            console.log("one alert deleted successfully");
            con.query("SELECT * FROM alerts", function (err, result, fields) {
                if (err) console.log(err);
                console.log(result);
                res.send(result);
            });
        });
    });

});

router.delete('/delete-all', function (req, res, next) {
    
    con.connect(function (err) {
        if (err) console.log(err);
        con.query(`Truncate table alerts`, function (err, result, fields) {
            if (err) console.log(err);
            console.log(result);
            console.log("one alert deleted successfully");
            con.query("SELECT * FROM alerts", function (err, result, fields) {
                if (err) console.log(err);
                console.log(result);
                res.send(result);
            });
        });
    });

});

module.exports = router;