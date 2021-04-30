const router = require('express').Router();
const authController = require('../controllers/authController');
const { me } = require('../middleware/authVerify');

router.post('/signup', authController.signup);

router.post('/activate', authController.activateEmail);

router.post('/login', authController.login);

router.post('/login/forgot', authController.forgotPassword);

router.post('/login/reset', me, authController.resetPassword);

router.get('/user/info', me, authController.getUserInfo);

router.get('/user/all_info', me,  authController.getAllUserInfo);

router.get('/user/logout', me, authController.logout);

router.patch('/user/update', me, authController.updateUser);

router.patch('/user/update_role/:id', me, authController.updateUserRole);

router.delete('/user/delete/:id', me, authController.deleteUser);

//social login
router.post('/google_login', authController.googleLogin);

module.exports = router;
