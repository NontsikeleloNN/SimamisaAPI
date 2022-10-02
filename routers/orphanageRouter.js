const orphanageController = require('../controllers/orphanageController.js')
//const childController = require('../controllers/childController')
const sponsor = require('../controllers/sponsorshipController.js')
const router = require('express').Router()


router.get('/',orphanageController.getAllOrphanages)
router.get('/id',orphanageController.getOrphanage)
router.post('/',orphanageController.regOrphanage)

router.get('/sponsorID',sponsor.getSponsorID) // ..?id=x

router.post('/om',orphanageController.regManager)
router.put('/',orphanageController.updateOrph)

module.exports = router;