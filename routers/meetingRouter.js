const meetingController = require('../controllers/meetingController')

const router = require('express').Router();

router.post('/', meetingController.createRequest)

router.put('/',meetingController.acceptRequest)
router.delete('/',meetingController.rejectRequest)
router.get('/',meetingController.getAllRequests)

module.exports = router

// /simamisa/orphanages/requests/ post