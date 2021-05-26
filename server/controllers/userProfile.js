const User = require('../models/User');
const fs = require('fs');

//for admin access
module.exports.getAllUserProfiles = async (req, res) => {
	try {
		const user = await User.find()
			.select('name email address phone');
			res.json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

//for user access
module.exports.getSingleProfile = async (req, res) => {
	try {
		const user = await User.findById({_id: req.user.id})
			.select('name email address phone');
		res.status(200).json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.updateProfile = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			{_id: req.user.id},
			{ $set: req.body },
			{ new: true }
		).select('name email address phone -_id');

		 res.status(200).json({user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.uploadAvatar = async (req, res) => {
	const file = req.file;

	if (!file)
		return res.status(400).json({message: 'Изображение не выбрано'});

	try {
		const basePath = `${req.protocol}://${req.get('host')}/`;

		const user = await User.findByIdAndUpdate(
			{_id: req.user.id},
			{avatar: req.file ? basePath + req.file.path : ''},
			{new: true}
		).select('avatar');

		// отмена загрузки изображения в локальное хранилище
		// fs.unlinkSync(req.file.path);
		await user.save();
		res.status(200).json({message: 'Аватар обновлён', user});
	} catch (err) {
		return res.status(500).json({message: err.message});

	}
};

module.exports.deleteAvatar = async (req, res) => {

	try {
		const basePath = `${req.protocol}://${req.get('host')}/`;

		const user = await User.findByIdAndUpdate({_id: req.user.id} ).select('avatar');

		const repUrl = (user.avatar).replace(basePath, '');

		fs.unlinkSync(repUrl);

		user.avatar = '';

		await user.save();

		res.status(200).json({message: 'Аватар удалён', user});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};