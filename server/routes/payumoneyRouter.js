const router = require('express').Router();
const Payumoney = require('../controllers/Payumoney');
const { me } = require('../middleware/authVerify');


router.post('/payumoney', Payumoney.payUMoneyPayment);
router.post('/payumoney/response', Payumoney.paymentResponse);

module.exports = router;