const itemProposalController = require('../controllers/itemProposalController');
const router = require('express').Router();

router.get('/',itemProposalController.getAllProposals)
router.get('/:id',itemProposalController.getProposal)
router.get('/item/:id',itemProposalController.getItemProposals)
router.get('/user/:id',itemProposalController.getUserProposals)
router.get('/unfulfilled',itemProposalController.getUnfulfilled)

router.post('/item' ,itemProposalController.createProposal)
router.post('/donation',itemProposalController.donate) //tested : input in the body itemid = id, comment + ProposalComment, userID = registeredUserID, donation amount = amount
router.put('/',itemProposalController.updateProposal)

module.exports = router