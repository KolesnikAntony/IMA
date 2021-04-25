const router = require('express').Router();
const uploadImg = require('../middleware/uploadImg');
const uploadController = require('../controllers/uploadController');
const { authVerify } = require('../middleware/authVerify');



router.post('/upload', uploadImg, authVerify, uploadController.uploadAvatar);

module.exports = router;
