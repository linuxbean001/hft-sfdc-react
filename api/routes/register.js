const express = require('express');
const router = express.Router();
const conRegister = require('../controller/con-register');

/* ****************************Get all registered user**************************** */
router.get('/user/all', conRegister.getAllUser);

/* ****************************Get all registered user**************************** */
router.delete('/delete/all', conRegister.deleteAllregisterUser);

/* *******************************User Registration************************************* */
router.post('/user', conRegister.addUser);

/* *******************************Stripe Payment Integration******************************** */
router.post('/stripe/payment/checkout', conRegister.goToStripe);

/* *******************************Stripe Payment Integration******************************** */
router.post('/send/welcome/email', conRegister.sendWelcomeEmail);


module.exports = router;