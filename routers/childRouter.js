const childController = require('../controllers/childController.js')
const sponsorship = require('../controllers/sponsorshipController')
const router = require('express').Router()


router.get('/',childController.getAllChildren)
router.get('/unsponsored',childController.getAllUnsponsoredChildren)
router.get('/mychildren',sponsorship.getMyChildren)
router.get('/child', childController.getChildbyID)
router.get('/orphanage/child', childController.getChildbyOrphanage) // ...?OrphID=#
router.get('/posts',sponsorship.getChildPosts) // ...?id=#
router.get('/sponsorship',childController.getSponsorshipID) //  .../?childID=#
router.delete('/post', sponsorship.deletePost) // .. /post?id=x
router.put('/post',sponsorship.editPost) // .. /post?id=x
router.get('/post',sponsorship.getPost) // .. /post?id=x
router.put('/sponsorship',sponsorship.editSponsorship ) //body
router.get('/child/post',sponsorship.getByChildID) // ..?id=x

module.exports = router;