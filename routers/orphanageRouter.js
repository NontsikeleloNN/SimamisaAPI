const orphanageController = require('../controllers/orphanageController.js')
//const childController = require('../controllers/childController')
const router = require('express').Router()


router.get('/',orphanageController.getAllOrphanages)
router.get('/:id',orphanageController.getOrphanage)
router.post('/',orphanageController.regOrphanage)
router.post('/om',orphanageController.regManager)

module.exports = router;