const OrphanageManagerController = require('../controllers/orphanageManagerController');
const SponsorshipController = require('../controllers/sponsorshipController');
const { OrphanageManager } = require('../models');
const router = require('express').Router();

router.put('/accept',OrphanageManagerController.acceptProposal)

router.put('/confirm',OrphanageManagerController.confirmFulfill)
router.put('/childneed/confirm',OrphanageManagerController.fulfillChildNeed)
router.put('/update',OrphanageManagerController.updateChildNeed)


//router.post('/sponsorship',OrphanageManagerController.createSponsorship)
//router.post('/sponsorship/accept',OrphanageManagerController.acceptSponsor)
router.get('/report/inventory', OrphanageManagerController.getInventory) // ?id=x (orphanageID)
router.get('/report/proposal',OrphanageManagerController.getOrphanageProposalsReport) //?id=x (orphanageID)
router.get('/report/needs', OrphanageManagerController.getMyItemsMonths) // ..?id=x
router.get('/report/demographics',OrphanageManagerController.getDemographics) // ?id=x (orphanageID)
router.get('/notifications',OrphanageManagerController.getNumNotifications) // ?id=x (orphanageID)
router.get('/flags',OrphanageManagerController.unreliableUsers)  // ?id=x (orphanageID)
router.get('/accountability', OrphanageManagerController.accountability)  // ?id=x (orphanageID)
router.get('/drops', OrphanageManagerController.DropOffsPerWeek) // ?id=x (orphanageID)
router.get('/pickups', OrphanageManagerController.PickUpsPerWeek) // ?id=x (orphanageID)
router.get('/gas',OrphanageManagerController.calcPetrol) // ?id=x (orphanageID)

router.delete('/remove/sponsor', OrphanageManagerController.deleteSpons)
router.put('/flag',OrphanageManagerController.flagUser)//?id=x (userID)
router.put('/unflag',OrphanageManagerController.unflagUser)//?id=x (userID)
router.put('/notifications',OrphanageManagerController.AllNotifications) // ?id=x (orphanageID)


router.post('/post',SponsorshipController.makePost)


module.exports = router

//error handlings