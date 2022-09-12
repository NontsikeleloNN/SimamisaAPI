const childneed = require('../controllers/childneedController');


const router = require('express').Router();


router.get('/needs',childneed.getSponsorChildNeeds) // .../?sponsorID=#
router.post('/',childneed.createChildNeed)
router.get('/child',childneed.getChildNeeds) // ...?childID=#

router.get('/need', childneed.getChildNeed) // .. /need?id=x
router.delete('/',childneed.deleteChildNeed) // ......./id=x

router.put('/',childneed.editChildNeed)  // ......./id=x
router.put('/pay',childneed.fulfillChildNeed) // ../pay?amt=#&id=# (childneedID)
module.exports = router