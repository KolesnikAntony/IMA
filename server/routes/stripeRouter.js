const router = require('express').Router();
const stripe = require('../controllers/stripeController');
const { me } = require('../middleware/authVerify');


router.post('/stripePay', stripe.stripePayment);

module.exports = router;