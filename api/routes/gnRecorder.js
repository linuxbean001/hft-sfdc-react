const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
conGnRecorder = require('../controller/con-gnRecorder')


/* ****************************Add Update**************************** */
router.post('/add', checkAuth, conGnRecorder.addUpdateRecording);

/* ****************************Get Event By Id**************************** */
router.get('/get/:eventId', checkAuth, conGnRecorder.getDrawingWithRecording);

/* ****************************Delete Event By Id**************************** */
// router.delete('/remove/:id', checkAuth, conEvent.deleteEventById);

/* ****************************Edit Event**************************** */
// router.post('/edit/:id', checkAuth, conEvent.editEvent);




module.exports = router;