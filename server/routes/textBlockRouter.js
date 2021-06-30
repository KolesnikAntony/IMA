const router = require('express').Router();
const textBlockController = require('../controllers/textBlock');

router.post('/text', textBlockController.createBlock);

router.get('/text', textBlockController.getBlock);

router.patch('/text/:id', textBlockController.editBlock);

module.exports = router;