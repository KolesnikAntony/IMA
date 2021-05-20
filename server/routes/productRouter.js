const { me } = require('../middleware/authVerify');
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const router = require('express').Router();

// post
router.post('/products/create', me, upload.single('imageSrc'), productController.createProduct);

// get
router.get('/products', me, productController.getProducts);

router.get('/products/get_new', me, productController.getNewProducts);

router.get('/products/color_category', me, productController.getColorAndCategory);


module.exports = router;