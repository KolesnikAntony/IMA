const router = require('express').Router();
const contactsController = require('../controllers/contactsController');
const { me } = require('../middleware/authVerify');

router.post('/contacts', me, contactsController.createContacts);
router.get('/contacts', contactsController.getContacts);
router.put('/contacts/:id', me, contactsController.editContacts);

module.exports = router;
