const express = require('express');
const router = express.Router();
const conSp = require('../controller/con-sp');
const checkAuth = require('../middleware/check-auth');

/* ****************************Save User Assesment**************************** */
router.post('/add', checkAuth, conSp.addSP_drawing);
/* ****************************Get Event By Id**************************** */
router.get('/drawing/:eventId', checkAuth, conSp.getDrawingByEventId);

router.post('/status', checkAuth, conSp.addSP_status);
module.exports = router;