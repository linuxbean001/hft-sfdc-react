const Register = require('../model/user-info.vo');
const Password = require('../model/user-pass.vo');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const query = require('../pg-connect');
const nodemailer = require('nodemailer');
const sendMail = require('./common/sendMail');

/* ****************************Login User and Authenticate**************************** */
exports.authenticate = (req, res, next) => {
    console.log('login init', req.body);

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Password is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

    let errors = req.validationErrors();
    if (errors) {
        res.status(201).json({
            message: 'Validation Errors',
            success: false,
            body: errors
        });
    } else {
        const sql = "SELECT * FROM salesforce.subscriber__c WHERE email__c = " + "'" + req.body.email + "'";
        query(sql)
            .then(data => {
                console.log(data);

                if (data.rowCount != 0) {
                    if (req.body.pass == data.rows[0].password__c) {
                        _getToken(data)
                            .then(token => {
                                res.status(201).json({
                                    message: "Login successful", 
                                    success: true,
                                    body: token
                                });
                            }).catch(err => {
                                res.status(400).json({
                                    message: "Backend Error",
                                    success: false,
                                    body: err
                                });
                            });

                    } else {
                        res.status(200).json({
                            message: "Wrong username or password",
                            success: false
                        });
                    }
                }
            }).catch(err => {
                res.status(400).json({
                    message: "Backend Error",
                    success: false,
                    body: err
                });
            });

    }
}

/* ****************************Forgot Password**************************** */
exports.forgetPassword = (req, res, next) => {
    console.log('xxxxxxxxxxxxxxxxx ', req.body.email);
    let email = req.body.email
    if (email) {
        const sql = "SELECT * FROM salesforce.subscriber__c WHERE email__c = " + "'" + email + "'";
        query(sql)
            .then(data => {
                console.log('xxxxxxxx xxxxxxxx xxxxxx ', data);
                if (data.rowCount != 0) {
                    _getToken(data)
                        .then(token => {
                            console.log('xxxx xxxxxxxx xxxxxxxxx token is', token);
                            var mailOptions = {
                                from: 'admin@helpfortrauma.com',
                                to: email,
                                subject: 'Help for trauma password reset',
                                text: 'Please click the link to reset your Help for trauma password' +
                                    'https://hft-sfdc.herokuapp.com/login/reset-password/' + token
                            };

                            sendMail.sendEmail(mailOptions)
                            .then(info => {
                                res.status(200).json({
                                    message: "Email set successfully",
                                    success: true,
                                    body: info
                                });
                            }).catch(er => {
                                res.status(401).json({
                                    message: "Backend Error",
                                    success: false,
                                    body: er
                                });
                            });
                        }).catch(err => {
                            console.log('xxxxxxxxxxxxx xxxxxxx error  xxxxxxxxxxxxx' + err);
                            res.status(401).json({
                                message: "Backend Error",
                                success: false,
                                body: err
                            });
                        });
                } else {
                    res.status(200).json({
                        message: "Email not registered",
                        success: false
                    });
                }
            }).catch(errr => {
                res.status(401).json({
                    message: "Backend Error",
                    success: false,
                    body: errr
                });
            });
    }
}

exports.resetPassword = (req, res, next) => {
    if (req.userData.email) {
        const sql = "UPDATE salesforce.subscriber__c SET Password__c =  " + "'" + req.body.pass + "' WHERE Email__c = " + "'" + req.userData.email + "'";

        query(sql)
            .then(data => {
                res.status(200).json({
                    message: "Password updated Successfully",
                    success: true,

                });
            }).catch(err => {
                res.status(401).json({
                    message: "Backend Error",
                    success: false,
                });
            });
    }
}

/* ****************************Private functions**************************** */
function _getToken(data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        const tokenData = _setDataForToken(data.rows[0]);
        const secret = "JWT_TOKEN_SECRET";
        const token = jwt.sign(tokenData, secret,
            {
                expiresIn: "5h"
            });
        resolve(token);
    });
}
function _setDataForToken(data) {
    console.log('xxxxxxxxxx xxxxxxxxxxxx', data);

    const tokenData = {
        id: data.id,
        sfid: data.sfid,
        fName: data.name,
        email: data.email__c,
        target: data.subs_options__c,
        username: data.username__c,
        createddate: data.createddate
    }
    return tokenData;
}
/**
 * Make promises in node (Not called anywhere) 
 */
function _getPass(usrId) {
    return new Promise((resolve, reject) => {
        Password.findOne({ usrId: usrId })
            .then(data => {
                console.log('pass', data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });
}
