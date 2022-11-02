var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sarah_app"
    });

    const email_address = req.body.body;

    const accountSid = "AC35b8811e6397965ad426fcbac76a1ea3";
    const authToken = "bacd245c24f0e746306a1227a893f967";

    const twilioClient = require("twilio")(accountSid, authToken);
    console.log(twilioClient.verify.services("AC35b8811e6397965ad426fcbac76a1ea3").verifications);

    // twilioClient.verify
    //     .services("AC35b8811e6397965ad426fcbac76a1ea3") //Put the Verification service SID here
    //     .verifications.create({ to: email_address, channel: "email" })
    //     .then(verification_check => console.log("aaa"));
    twilioClient.verify.v2.services('AC35b8811e6397965ad426fcbac76a1ea3')
    .verifications
    .create({to: email_address, channel: 'email'})
    .then(verification => console.log(verification.sid));
});

module.exports = router;
