const orphanageController = require('../controllers/orphanageController.js')
//const childController = require('../controllers/childController')
const router = require('express').Router()


router.get('/',orphanageController.getAllOrphanages)
router.get('/:id',orphanageController.getOrphanage)

module.exports = router;