const router = require('express').Router();
const orderController = require('../controllers/orderController');
const me = require('../middleware/authVerify');


router.post('/order', orderController.createOrder);

router.get('/order', orderController.getOrders);

router.get('/order/:id', orderController.getOrderById);

module.exports = router;
