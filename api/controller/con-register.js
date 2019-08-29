const Register = require('../model/user-info.vo');
const Password = require('../model/user-pass.vo');
const bcrypt = require('bcrypt-nodejs');
const query = require('../pg-connect');
const jwt = require('jsonwebtoken');
var stripe = require("stripe")("sk_test_unhqxPhbXkWJr12H8pfKvp4W");
const sendMail = require('./common/sendMail');

/* ****************************delete all registered user**************************** */
exports.deleteAllregisterUser = (req, res, next) => {
    Register.remove({}, (err, users) => {
        Password.remove({}, (err, pass) => {
            res.status(200).json({
                message: 'deleted all successfully',
                success: true,
            });
        });
    });
}

/* ************************ tripe Payment Integration ******************** */
exports.goToStripe = (req, res, next) => {
    const token = req.body.token;
    stripe.charges.create({
        amount: 4444,
        currency: "usd",
        source: token.id,
        description: "Charge on a connected account",
    },
        function (err, charge) {
            if (err && err.typr == "StripeCardError") {
                console.log('xxxx xxxxx x err', err);
            } else {
                console.log(charge.paid);
                if (charge.paid) {
                    res.status(201).json({
                        success: true,
                        message: "Payment Successfull",
                        body: charge
                    });
                }
            }
        });

}

/* ****************************Add User PostGrase**************************** */

const checkAFId = async (result)=>{

    const sql = "SELECT * FROM salesforce.subscriber__c WHERE email__c = " + "'" + result.rows[0].email__c + "'";
        console.log('fetch sfid sql', sql);
        try {
        const data = await query(sql);
        if (data.rowCount != 0) {
            if (result.rows[0].password__c == data.rows[0].password__c) {
                if (data.rows[0].sfid) {
                    console.log('sfid ', data.rows[0].sfid);
                    return data.rows[0].sfid;
                }
                else {
                    checkAFId(result);
                }
            }
            else {
                console.log('Pass not matched');
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    
}

exports.addUser = (req, res, next) => {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('targetid', 'Targetid is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.status(201).json({
            message: 'Validation Errors',
            success: false,
            body: errors
        });

        res.end();
    } else {
        _checkForAlreadyRegistered(req.body.email)
            .then(data => {
                if (!data) {
                    console.log('xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx registration init');
                    const sql = 'INSERT INTO salesforce.subscriber__c (email__c, password__c, name, username__c, subs_options__c, createddate) VALUES($1,$2,$3,$4,$5,$6) RETURNING id, username__c,email__c,password__c';
                    const data = _setReqData(req);
                    query(sql, data)
                        .then(result => {
                            const sfid=checkAFId(result);
                            console.log('sfid out',sfid);
                            if(sfid){
                                console.log('sfid in',sfid);
                                authenticate(result.rows[0].email__c, result.rows[0].password__c) 
                                .then(data => {
                                    console.log('xxxxxx token xxxxxxxxx', data);
                                    res.status(201).json({
                                        message: 'Registered Successfully',
                                        success: true,
                                        body: data
                                    });
                                }).catch(err => {
                                    res.status(401).json({
                                        message: "Backend Error",
                                        success: false,
                                    });
                                });
                            }
                               
                        }).catch(err => {
                            res.status(400).json({
                                message: 'Backend Error',
                                success: false,
                                body: err
                            });
                        });
                } else {
                    res.status(201).json({
                        message: 'Username or already registered',
                        success: false
                    });
                }
            }).catch(err => {
                res.status(400).json({
                    message: 'Backend Error',
                    success: false,
                    body: err
                });
            });
    }
}
/**************login function************** */

function authenticate(email, pass) {
        const sql = "SELECT * FROM salesforce.subscriber__c WHERE email__c = " + "'" + email + "'";
        console.log('xxxxxxxxx login email', sql);
        return query(sql)
            .then(data => {
                console.log(data);

                if (data.rowCount != 0) {
                    if (pass == data.rows[0].password__c) {
                       return _getToken(data)
                            .then(token => {
                                console.log('token login', token);                               
                                   return token;                              
                            }).catch(err => {
                                console.log(err);
                                return err;
                            });

                    } else {
                       
                    }
                }
            }).catch(err => {
                console.log(err);
            });

}
/* ****************************Get All User PostGrase**************************** */
exports.getAllUser = (req, res, next) => {
    console.log('xxxxxxxxxxxxx xxxxxxxxxxx get all init');
    const sql = "SELECT * FROM salesforce.Assessments__c";
    console.log('xxxxxx xxxxxxx xxxxxxxx ', sql);

    query(sql)
        .then(data => {
            console.log(data);
            res.status(200).json({
                message: 'all registerd users',
                success: true,
                body: data.rows
            });

        }).catch(err => {
            console.log(err);
        });
}

/* ****************************Send Welcome Email**************************** */
exports.sendWelcomeEmail = async (req, res) => {
    console.log('xxxxxxxxxxxxxxxxx ', req.body.email);
    let email = req.body.email
    let name = req.body.name
    if (email) {
        var mailOptions = {
            from: 'admin@helpfortrauma.com',
            to: email,
            subject: 'Welcome to help for trauma',
            text: `Hello ${name},
                Welcome to the Help For Trauma (intensive trauma therepy). Your account is created successfully with email ${email}. Visit https://hft-sfdc.herokuapp.com for more details.
            `
        };

        try {
            const result = await sendMail.sendEmail(mailOptions);
            res.status(200).json({
                message: "Email set successfully",
                success: true,
                body: result
            });
        } catch (err) {
            res.status(401).json({
                message: "Backend Error", 
                success: false,
                body: err
            });
        }
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
function _setReqData(req) {
    const reqObj = [
        req.body.email,
        req.body.pass,
        req.body.name,
        req.body.username,
        req.body.targetid,
        new Date()
    ]
    return reqObj;
}

function _setPass(req) {
    let hash = bcrypt.hashSync(req.body.pass);
    const reqObj = [
        hash,
        req.body.email,
    ];
    return reqObj;
}

function _savePass(req, res) {
    const sql = 'INSERT INTO access (pass, email) VALUES ($1, $2)';
    const passData = _setPass(req);

    query(sql, passData)
        .then(data => {
            res.status(201).json({
                message: 'Data added successfully',
                success: true
            });

        }).catch(err => {
            console.log(err);
        });
}

function _checkForAlreadyRegistered(email, username) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from salesforce.subscriber__c WHERE email__c = " + "'" + email + "'" + " OR username__c = " + "'" + username + "'";
        console.log(sql);
        query(sql)
            .then(data => {
                console.log('xxx xxxx xxxxx data is ' + data.rowCount);
                if (data.rowCount != 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
