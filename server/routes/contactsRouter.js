const router = require('express').Router();
const contactsController = require('../controllers/contactsController');
const { me } = require('../middleware/authVerify');

router.post('/contacts', me, contactsController.createContacts);
router.get('/contacts', me, contactsController.getContacts);

module.exports = router;
