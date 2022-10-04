const adminController = require('../controllers/adminController')
const router = require('express').Router();

router.get('/needs', adminController.getAllOrphanageItemsMonths)
router.get('/childneeds', adminController.childrenNeeds)
router.get('/users',adminController.getNumberofRegisteredUsers)
router.get('/sponsors',adminController.getNumberofSponsors)
router.get('/unfulfilled',adminController.getAllUnmetOrphaganes)
router.get('/orphanages',adminController.getNumberofOrphanages)
router.get('/children', adminController.getChildren)
router.get('/donations', adminController.getAmount)
router.get('/highestPriority',adminController.orphanageHighestPriority)
router.get('/t',adminController.Testing)

router.post('/',adminController.distributeFunds)

/** console.log(error)
    res.status(500).json({
        errorMessage: error.message
    }) */
module.exports = router