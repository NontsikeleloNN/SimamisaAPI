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
router.get('/Jan',adminController.Jan)
router.get('/Feb',adminController.Feb)
router.get('/March',adminController.March)
router.get('/April',adminController.April)
router.get('/May',adminController.May)
router.get('/June',adminController.June)
router.get('/July',adminController.July)
router.get('/Aug',adminController.Aug)
router.get('/Sept',adminController.Sept)
router.get('/Oct',adminController.Oct)

router.post('/',adminController.distributeFunds)

/** console.log(error)
    res.status(500).json({
        errorMessage: error.message
    }) */
module.exports = router