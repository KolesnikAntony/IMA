const router = require('express').Router();
const textBlockController = require('../controllers/textBlock');

router.post('/text', textBlockController.createBlock)

module.exports = router;