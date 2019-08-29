const express = require('express');
const router = express.Router();
const conEvent = require('../controller/con-event');
const checkAuth = require('../middleware/check-auth');

/* ****************************Add Event PostGrase**************************** */
router.post('/add', checkAuth, conEvent.addEvent);

/* ****************************Get Event By Id**************************** */
router.get('/get/:id', checkAuth, conEvent.getEventById);

/* ****************************Delete Event By Id**************************** */
router.delete('/remove/:id', checkAuth, conEvent.deleteEventById);
-
/* ****************************Edit Event**************************** */
router.post('/edit/:id', checkAuth, conEvent.editEvent);

/* ****************************Add Event Status**************************** */
router.post('/status', checkAuth, conEvent.addEventStatus); 

module.exports = router;