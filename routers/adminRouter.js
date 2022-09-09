const adminController = require('../controllers/adminController')
const router = require('express').Router();

router.get('/needs', adminController.getAllOrphanageItemsMonths)

module.exports = router