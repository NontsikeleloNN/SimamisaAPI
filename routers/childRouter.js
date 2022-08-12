const childController = require('../controllers/childController.js')
const sponsorship = require('../controllers/sponsorshipController')
const router = require('express').Router()


router.get('/',childController.getAllChildren)
router.get('/mychildren',sponsorship.getMyChildren)
router.get('/child', childController.getChildbyID)
router.get('/orphanage/child', childController.getChildbyOrphanage) // ...?OrphID=#
router.get('/posts',sponsorship.getChildPosts) // ...?sponsorshipID=#
module.exports = router;