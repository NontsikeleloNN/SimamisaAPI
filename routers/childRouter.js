const childController = require('../controllers/childController.js')
const sponsorship = require('../controllers/sponsorshipController')
const router = require('express').Router()


router.get('/',childController.getAllChildren)
router.get('/mychildren',sponsorship.getMyChildren)
router.get('/child', childController.getChildbyID)
router.get('/orphanage/child', childController.getChildbyOrphanage) // ...?OrphID=#
router.get('/posts',sponsorship.getChildPosts) // ...?sponsorshipID=#
router.get('/sponsorship',childController.getSponsorshipID) //  .../?childID=#
router.delete('/post', sponsorship.deletePost) // .. /post?id=x
router.put('/post',sponsorship.editPost) // .. /post?id=x
router.get('/post',sponsorship.getPost) // .. /post?id=x

module.exports = router;