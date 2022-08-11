const OrphanageManagerController = require('../controllers/orphanageManagerController');
const SponsorshipController = require('../controllers/sponsorshipController')
const router = require('express').Router();

router.put('/accept',OrphanageManagerController.acceptProposal)

router.put('/confirm',OrphanageManagerController.confirmFulfill)
router.put('/childneed/confirm',OrphanageManagerController.fulfillChildNeed)
router.put('/update',OrphanageManagerController.updateChildNeed)


router.post('/sponsorship',OrphanageManagerController.createSponsorship)
router.post('/sponsorship/accept',OrphanageManagerController.acceptSponsor)

router.post('/post',SponsorshipController.post)
module.exports = router

//error handlings