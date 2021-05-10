const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { me } = require('../middleware/authVerify');

//get
router.get('/categories', me, categoryController.getCategories);

router.get('/categories/New', me, categoryController.getCategories);

// post
router.post('/category/add', me, categoryController.addCategory);

//delete
router.delete('/category/delete', me, categoryController.removeCategory);

module.exports = router;


