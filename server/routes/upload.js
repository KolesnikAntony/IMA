const router = require('express').Router();
const uploadImg = require('../middleware/uploadImg');
const uploadController = require('../controllers/uploadController');
const { me } = require('../middleware/authVerify');



router.post('/upload', uploadImg, me, uploadController.uploadAvatar);

module.exports = router;
