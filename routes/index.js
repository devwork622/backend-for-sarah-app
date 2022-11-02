var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  if (req.body.length != undefined) {
    const detectedData = req.body;
    console.log("detected_alert_data =============>", req.body);
    //section for getting all emails from database
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ryan_db"
    });

    con.connect(function (err) {
      if (err) console.log(err);

      con.query("SELECT email FROM emails", function (err, result, fields) {
        if (err) console.log(err);
        let email = result.map(val => `${val.email}`)
        let str_email = "";
        str_email = email.toString();
        console.log(str_email);

        var transporter = require("nodemailer").createTransport({
          host: 'mail.privateemail.com',
          port: 587,
          secureConnection: true,
          auth: {
            user: "support@topwebdev.pro",
            pass: "wonderful@0201"
          }
        });

        var str = "";

        detectedData.map((e) => {
          if(e.type == 2) {
            let fDate = e.first_date;
            let sDate = e.second_date;            
            if(e.first_date == e.second_date) sDate = "";
            else sDate = " : " + sDate;
            str += e.name + " - " + fDate + sDate + "\n" + "DROP" + confirmData + "\n\n";
          }
          else {
            let fDate = e[6];
            let sDate = e[7];
            if (e[6] == e[7]) sDate = "";
            else sDate = " : " + sDate;
            str += e[5] + " - " + fDate + sDate + "\n" + e[4] + " - " + e[3] + " - " + e[2] + " - " + e[1] + " -" + e[0] + "\n" + "----------" + "\n" + e[8] + " - "  + "R"  + "\n\n";
          }

        })

        var mailOptions = {
          from: "support@topwebdev.pro",
          to: str_email,
          subject: 'Mail from FLICA',
          text: str

        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.status(200).send('Message sent to your account successfully ' + email + '.');
        });
        res.send('Hi');

      });
    });
  }
});

module.exports = router;
