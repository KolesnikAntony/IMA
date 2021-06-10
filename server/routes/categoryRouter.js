const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { me } = require('../middleware/authVerify');

//get
router.get('/category', me, categoryController.getCategories);

router.get('/category/ctgs_clrs', categoryController.getCategoriesAndColors);

router.get('/category/:id', me, categoryController.getCategoryById);

// post
router.post('/category', me, categoryController.addCategory);

//delete
router.delete('/category/:id', me, categoryController.removeCategory);

module.exports = router;


