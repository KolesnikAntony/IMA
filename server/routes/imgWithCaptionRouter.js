const router = require('express').Router();
const imgWithCaption = require('../controllers/imgWithCaptionController');
const { me } = require('../middleware/authVerify');

router.post('/imgWithCaption', me, imgWithCaption.createImgWithCaption);


module.exports = router;