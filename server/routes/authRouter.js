const router = require('express').Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotpassword);

router.put('/resetpassword/:resetToken', authController.resetpassword);

module.exports = router;
