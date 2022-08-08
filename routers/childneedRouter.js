const childneed = require('../controllers/childneedController');


const router = require('express').Router();


router.get('/need ',childneed.getSponsorChildNeeds)
router.post('/',childneed.createChildNeed)
router.get('/child',childneed.getChildNeeds)

module.exports = router