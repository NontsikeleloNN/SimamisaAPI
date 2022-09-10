const adminController = require('../controllers/adminController')
const router = require('express').Router();

router.get('/needs', adminController.getAllOrphanageItemsMonths)
router.get('/childneeds', adminController.childrenNeeds)
router.get('/users',adminController.getNumberofRegisteredUsers)
router.get('/sponsors',adminController.getNumberofSponsors)
router.get('/unfulfilled',adminController.getAllUnmetOrphaganes)
router.get('/orphanages',adminController.getNumberofOrphanages)

module.exports = router