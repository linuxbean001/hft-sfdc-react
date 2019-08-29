const express = require('express');
const router = express.Router();
const conImgConverter = require('../controller/con-imgConverter');


/* ****************************Add Event PostGrase**************************** */
router.post('/converter', conImgConverter.convertTextToImg);
module.exports = router;