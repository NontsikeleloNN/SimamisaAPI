const OrphanageManagerController = require('../controllers/orphanageManagerController');
const router = require('express').Router();

router.put('/accept',OrphanageManagerController.acceptProposal)

router.put('/confirm',OrphanageManagerController.confirmFulfill)
router.put('/childneed/confirm',OrphanageManagerController.fulfillChildNeed)



router.post('/sponsorship',OrphanageManagerController.createSponsorship)
router.post('/sponsorship/accept',OrphanageManagerController.acceptSponsor)
module.exports = router

//error handlings