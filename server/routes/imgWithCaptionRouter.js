const router = require('express').Router();
const contactsController = require('../controllers/contactsController');
const { me } = require('../middleware/authVerify');

router.post('/imgWithCaption', me, contactsController.createContacts);


module.exports = router;