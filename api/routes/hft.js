const express = require('express');
const router = express.Router();
const conHft = require('../controller/con-hft');
const checkAuth = require('../middleware/check-auth');

/* ****************************Get Assesment**************************** */
router.get('/assessment/:assType', checkAuth, conHft.getAssessment);

/* ****************************Save User Assesment**************************** */
router.post('/assessment/save_result', checkAuth, conHft.saveAssResult);

/* ****************************Request Assesment**************************** */
router.post('/assessment/request', checkAuth, conHft.requestAssesment);

/* ****************************Get User Assessment Result**************************** */
router.get('/user/assessment/ass_result', checkAuth, conHft.getUsrAssResult);

/* *************************** Check If User is allowed for Assessment ************** */
router.get('/check/assessment/user/:ass', checkAuth, conHft.checkIfUsrAllowedForAss);

/* ****************************get User Assesment home**************************** */
router.get('/user/assessment/ass_result_home', checkAuth, conHft.getUsrAssResultHome);
/* ****************************get User Assesment status**************************** */
router.get('/user/assessment/ass_result_status', checkAuth, conHft.getUsrAssResultStatus);

module.exports = router;