const Banner = require('../models/Banner');

module.exports.createBanner = async (req, res) => {

	try {

		const banner = new Banner({
			content: req.body.content
		});

		await banner.save();

		res.status(201).json({message: 'Текст добавлен', banner});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};

module.exports.getBanner = async (req, res) => {

	try {

		const banner = await Banner.find();

		res.status(200).json({banner});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};

module.exports.editBanner = async (req, res) => {

	try {
		const { id } = req.params;

		const editBanner = {
			content: req.body.content
		};

		const banner = await Banner.findByIdAndUpdate(
			{ _id: id },
			{ $set: editBanner },
			{ new: true }
		);

		res.status(200).json({message: 'Контент успешно обновлен!', banner});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};