const router = require('express').Router();
const userProfile = require('../controllers/userProfile');
const { me } = require('../middleware/authVerify');
const upload = require('../middleware/upload');


//for admin access
router.get('/all_profiles', me, userProfile.getAllUserProfiles);

//for user access
router.get('/profile', me, userProfile.getSingleProfile);

router.patch('/profile/avatar', me, upload.single('avatar'), userProfile.uploadAvatar);

router.delete('/profile/delete_avatar', me, userProfile.deleteAvatar);

router.patch('/profile/update', me, userProfile.updateProfile);

module.exports = router;