const express = require('express');
const router = express.Router();
const conEd = require('../controller/con-ed');
const checkAuth = require('../middleware/check-auth');

/* ****************************Get Assesment**************************** */

/* ****************************Save User Assesment**************************** */

router.post('/add/dialogue', checkAuth, conEd.addDialoge);
router.get('/get/dialogue', checkAuth, conEd.getDialoge);
router.post('/edit/dialogue', checkAuth, conEd.editDialoge);
router.post('/delete/dialogue/:id', checkAuth, conEd.deleteDialoge);
router.post('/status', checkAuth, conEd.addEdDialoge);
module.exports = router;