const router = require('express').Router();
const authController = require('../controllers/authController');
const { authVerify } = require('../middleware/authVerify');
const { authAdmin } = require('../middleware/authAdmin');


router.post('/signup', authController.signup);

router.post('/activate', authController.activateEmail);

router.post('/login', authController.login);

router.post('/refresh_token', authController.accessToken);

router.post('/login/forgot', authController.forgotPassword);

router.post('/login/reset', authVerify, authController.resetPassword);

router.get('/user/info', authVerify, authController.getUserInfo);

router.get('/user/all_info', authVerify, authAdmin,  authController.getAllUserInfo);

router.get('/user/logout', authController.logout);

router.patch('/user/update', authVerify, authController.updateUser);

router.patch('/user/update_role/:id', authVerify, authAdmin, authController.updateUserRole);

router.delete('/user/delete/:id', authVerify, authAdmin, authController.deleteUser);

//socian login
router.post('/google_login', authController.googleLogin);

module.exports = router;
