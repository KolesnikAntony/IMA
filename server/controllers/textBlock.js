const TextBlock = require('../models/TextBlock');

module.exports.createBlock = async (req, res) => {

	try {

		const textBlock = new TextBlock({
			content: req.body.content
		});

		await textBlock.save();

		res.status(201).json({message: 'Текст добавлен', textBlock});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};

module.exports.getBlock = async (req, res) => {

	try {

		const textBlock = await TextBlock.find();

		res.status(200).json({textBlock});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};

module.exports.editBlock = async (req, res) => {

	try {
		const { id } = req.params;

		const editContacts = {
			content: req.body.content
		};

		const textBlock = await TextBlock.findByIdAndUpdate(
			{ _id: id },
			{ $set: editContacts },
			{ new: true }
		);

		res.status(200).json({message: 'Контент успешно обновлен!', textBlock});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};