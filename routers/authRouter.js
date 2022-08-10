const authC = require('../controllers/authController.js');

const router = require('express').Router();

router.post('/register',authC.registerUser);
router.post('/login',authC.login)
router.get('/',authC.getUsers)
module.exports = router;