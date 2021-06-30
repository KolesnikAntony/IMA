const TextBlock = require('../models/TextBlock');

module.exports.createBlock = async (req, res) => {

	try {

		const textBlock = new TextBlock({
			tBlock: req.body.tBlock
		});

		await textBlock.save();

		res.status(201).json({message: 'Текст добавлен', textBlock});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};
