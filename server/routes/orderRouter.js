const router = require('express').Router();
const orderController = require('../controllers/orderController');
const me = require('../middleware/authVerify');


router.post('/order', orderController.createOrder);

router.get('/order', orderController.getOrders);

module.exports = router;
