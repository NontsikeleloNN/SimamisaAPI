const childneed = require('../controllers/childneedController');


const router = require('express').Router();


router.get('/need ',childneed.getSponsorChildNeeds) // .../?sponsorID=#
router.post('/',childneed.createChildNeed)
router.get('/child',childneed.getChildNeeds) // ...?childID=#

module.exports = router