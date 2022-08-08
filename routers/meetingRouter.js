const meetingController = require('../controllers/meetingController')

const router = require('express').Router();

router.post('/', meetingController.createMeeting)
router.get('/',meetingController.getAllActiveMeetings)

module.exports = router