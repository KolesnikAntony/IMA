const router = require('express').Router();
const uploadImg = require('../middleware/uploadImg');
const uploadController = require('../controllers/uploadController');


router.post('/upload', uploadImg, uploadController.uploadAvatar);

module.exports = router;
