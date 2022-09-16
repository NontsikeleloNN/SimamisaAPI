const authC = require('../controllers/authController.js');


const router = require('express').Router();

router.post('/register',authC.registerUser);
router.post('/admin',authC.registerAdmin)
router.post('/login',authC.login)
router.get('/all',authC.getUsers)
router.get('/',authC.getPhonenumber)


module.exports = router;