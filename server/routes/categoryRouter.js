const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { me } = require('../middleware/authVerify');

//get
router.get('/category', me, categoryController.getCategories);

router.get('/category/ctgs_clrs', categoryController.getCategoriesAndColors);

// post
router.post('/category/add', me, categoryController.addCategory);

//delete
router.delete('/category/delete', me, categoryController.removeCategory);

module.exports = router;


