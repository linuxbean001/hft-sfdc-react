const express = require('express');
const router = express.Router();
const conLogin = require('../controller/con-login');
const checkAuth = require('../middleware/check-auth');

/* ****************************Login User and Authenticate**************************** */
router.post('/authenticate', conLogin.authenticate);

/* *******************************User Registration************************************* */
router.post('/forget-password', conLogin.forgetPassword);

/* *******************************User Registration************************************* */
router.post('/reset-password', checkAuth, conLogin.resetPassword);

module.exports = router;    