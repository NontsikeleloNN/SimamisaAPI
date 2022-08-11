const meetingController = require('../controllers/meetingController')

const router = require('express').Router();

router.post('/', meetingController.createMeeting)
router.get('/',meetingController.getAllActiveMeetings)
router.put('/',meetingController.acceptMeeting)
module.exports = router