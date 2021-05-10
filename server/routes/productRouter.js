const router = require('express').Router();
const { me } = require('../middleware/authVerify');
const productController = require('../controllers/productController');

// post
router.post('/products/create', me, productController.createProduct);

// get
router.get('/products', me, productController.getProducts);

router.get('/products/get_new/:count', me, productController.getNewProducts);


module.exports = router;