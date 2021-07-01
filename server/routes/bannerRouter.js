const router = require('express').Router();
const bannerController = require('../controllers/bannerController');

router.post('/banner', bannerController.createBanner);

router.get('/banner', bannerController.getBanner);

router.patch('/banner/:id', bannerController.editBanner);

module.exports = router;