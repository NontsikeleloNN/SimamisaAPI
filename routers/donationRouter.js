const donationController = require('../controllers/donationController')

const router = require('express').Router();

router.post('/',donationController.generalDonate)
/** 
 *  const amount = Number(req.body.amt)
    const user = req.body.userid

*/
module.exports = router;