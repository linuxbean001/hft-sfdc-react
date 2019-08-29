const express = require('express');
const router = express.Router();
const conGN = require('../controller/con-gn');
const checkAuth = require('../middleware/check-auth'); 

/* ****************************Add Event PostGrase**************************** */
router.post('/add', checkAuth, conGN.addDrawing);

/* ****************************Get Event By Id**************************** */
router.get('/drawing/:eventId', checkAuth, conGN.getDrawingByEventId);

/* ****************************Delete Event By Id**************************** */
router.delete('/remove/:id', checkAuth, conGN.deleteDrawingtById);

/* ****************************Edit Event**************************** */
router.get('/pdf/:eventId', conGN.getDrawingPdf);

/* ****************************Change Drawing Title**************************** */
router.post('/update/title', checkAuth, conGN.changeDrawingTitle);

/* ****************************Add Event PostGrase**************************** */
router.post('/status', checkAuth, conGN.addGnStatus);

module.exports = router;