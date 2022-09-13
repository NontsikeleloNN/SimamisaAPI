const meetingController = require('../controllers/meetingController')

const router = require('express').Router();

router.post('/', meetingController.createRequest)

router.put('/',meetingController.acceptRequest)

module.exports = router