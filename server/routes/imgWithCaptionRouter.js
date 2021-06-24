const router = require('express').Router();
const imgWithCaption = require('../controllers/imgWithCaptionController');
const upload = require('../middleware/upload');
const { me } = require('../middleware/authVerify');

router.post('/imgWithCaption', me, upload.single('image'), imgWithCaption.createImgWithCaption);

router.get('/imgWithCaption', me, imgWithCaption.getImgWithCaption);

router.put('/imgWithCaption/:id', me, imgWithCaption.editImgWithCaption);


module.exports = router;