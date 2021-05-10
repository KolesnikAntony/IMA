const User = require('../models/User');

//for admin access
module.exports.getAllUserProfiles = async (req, res) => {
	try {
		const user = await User.find()
			.select('name email address phone');
			res.json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}

//for user access
module.exports.getSingleProfile = async (req, res) => {
	try {
		const user = await User.findById({_id: req.user.id})
			.select('name email address phone -_id');
		res.json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}

module.exports.updateProfile = async (req, res) => {
	try {
		const user = await User.findOneAndUpdate(
			{_id: req.user.id},
			{ $set: req.body },
			{ new: true }
		).select('name email address phone -_id');

		 res.json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}


