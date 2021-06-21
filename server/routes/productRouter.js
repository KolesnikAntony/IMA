const { me } = require('../middleware/authVerify');
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const router = require('express').Router();

// post
router.post('/products', me, upload.single('imageSrc'), productController.createProduct);

// get
router.get('/products', productController.getProducts);

router.get('/products/color_category', productController.getColorAndCategory);

router.get('/products/:id', productController.getProductById);

router.patch('/products/update_prod', productController.updateCollection);

router.put('/products/:id', me, upload.single('imageSrc'), productController.editProduct);

router.delete('/products/:id', me, productController.removeProduct);

module.exports = router;