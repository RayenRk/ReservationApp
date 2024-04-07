"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

//const fs = require("fs");
// async..await is not allowed in global scope, must use a wrapper
const nodeMailer = async (to) => {
    if (!to) {
       // console.log(to + "tooo")
        //console.error("Email address is undefined or null.");
        return;
    }
    console.log("x"+to.toString());
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "ghabrimouheb@gmail.com",
            pass: process.env.SMTP_PWD,

        },
    });
    const body = "<h1>Hello</h1>"+
        "<h2>we're sorry to inform you that the  desired room is reserved</h2>"+
        "<p>Thank you</p>";
    const message = {
        from: '"mouheb" ghabrimouheb@gmail.com', // sender address
        to: to.toString(), // list of receivers
        subject: "About reservation", // Subject line
        html: "<h1>Hello</h1>"+
            "<h2>we're sorry to inform you that the  desired room is reserved</h2>"+
            "<p>Thank you</p>", // html body

    };

    // send mail with defined transport object
    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("problem");
        } else {
            console.log("mail sent:" + info.response);
        }
    });
};

module.exports = {
    nodeMailer,
};