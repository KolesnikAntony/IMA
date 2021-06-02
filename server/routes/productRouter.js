const { me } = require('../middleware/authVerify');
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const router = require('express').Router();

// post
router.post('/products/create', me, upload.single('imageSrc'), productController.createProduct);

// get
router.get('/products', productController.getProducts);

router.get('/products/color_category', productController.getColorAndCategory);

router.get('/products/:id', productController.getProductById);

router.patch('/products/update_prod',productController.updateCollection);

module.exports = router;