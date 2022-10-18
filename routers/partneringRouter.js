const partneringController = require('../controllers/partneringController')

const router = require('express').Router()

router.get('/allOffers',partneringController.getAllOffers)
router.get('/allOfferItems', partneringController.getAllOfferItems)
router.post('/',partneringController.sendReq)// sending a partnering request (... /from?=x&to?=y)
router.get('/',partneringController.getPartners) //get my partners ( orphanages/partnering/id?=x)
router.post('/offers/publish/',partneringController.sendOfferToAll) // (orphanages/partnering/offers/publish/id?=x)
router.post('/offers/',partneringController.sendOfferToOne)
router.put('/',partneringController.acceptRequest) // (/?from=x&to=y)
router.get('/offers/',partneringController.getMyOffers) //pffers made to me .. /offers/?id=x
router.get('/requests/', partneringController.getRequests) // .. /requests/?id=x
router.get('/sent', partneringController.getSentOffers) // orphanageID
router.put('/offers/',partneringController.acceptOffer)// "offerItemID","id" : orphanageID that is accepting, "amount"
router.put('/reject', partneringController.rejectOffer) //"offerItemID","id" : orphanageID that is accepting
router.put('/confirm', partneringController.confirm)//"offerItemID","id" : orphanageID that is accepting
module.exports = router