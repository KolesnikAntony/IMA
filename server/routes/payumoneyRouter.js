const router = require('express').Router();
const Payumoney = require('../controllers/Payumoney');
const { me } = require('../middleware/authVerify');


router.post('/payumoney', me, Payumoney.payUMoneyPayment);
router.post('/payumoney/response', me, Payumoney.paymentResponse);

module.exports = router;