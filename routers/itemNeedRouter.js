const itemNeedController = require('../controllers/itemNeedController');
const router = require('express').Router();

router.get('/',itemNeedController.getAllNeeds)
router.get('/active/',itemNeedController.getAllActiveNeeds)
router.get('/orphanage/:id',itemNeedController.getOrphanageNeeds)
router.get('/:name',itemNeedController.getAllActiveNeedsByName)
router.get('/id',itemNeedController.getNeed)

router.get('/item', itemNeedController.getItemNeed)

router.delete('/',itemNeedController.deleteItem)
router.post('/',itemNeedController.createItem)

router.put('/',itemNeedController.updateItem)

module.exports = router