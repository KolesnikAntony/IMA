const router = require('express').Router();
const cartController = require('../controllers/Cart');

router.get('/cart', cartController.cartFilter);

module.exports = router;
