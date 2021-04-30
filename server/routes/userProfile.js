const router = require('express').Router();
const userProfile = require('../controllers/userProfile');
const { me } = require('../middleware/authVerify');

//for admin access
router.get('/all_profiles', me, userProfile.getAllUserProfiles);

//for user access
router.get('/profile', me, userProfile.getSingleProfile);

router.patch('/profile/update', me, userProfile.updateProfile);

module.exports = router;