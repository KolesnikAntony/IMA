const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.cartFilter);

module.exports = router;