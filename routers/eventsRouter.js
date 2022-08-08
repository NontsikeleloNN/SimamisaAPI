const eventController = require('../controllers/eventController');

const router = require('express').Router();

router.get('/', eventController.getAllEvents);
router.get('/orphanage/:id',eventController.getEventbyOrphanage);
router.get('/id/:id',eventController.getEvent);
router.get('/:name',eventController.getEventByName);

router.post('/', eventController.createEvent);

router.put('/:id', eventController.updateEvent);

router.delete('/:id',eventController.deleteEvent);

module.exports = router;