const partneringController = require('../controllers/partneringController')

const router = require('express').Router()

router.post('/',partneringController.sendReq)// sending a partnering request (... /from?=x&to?=y)
router.get('/',partneringController.getPartners) //get my partners ( orphanages/partnering/id?=x)
router.post('/offers/publish/',partneringController.sendOfferToAll) // (orphanages/partnering/offers/publish/id?=x)
router.post('/offers/',partneringController.sendOfferToOne)
router.put('/',partneringController.acceptRequest) // (/?from=x&to=y)
router.get('/offers/',partneringController.getMyOffers) //pffers made to me .. /offers/?id=x
router.get('/requests/', partneringController.getRequests) // .. /requests/?id=x
router.put('/offers/',partneringController.acceptOffer)// "offerItemID","id" : orphanageID that is accepting, "amount"
module.exports = router