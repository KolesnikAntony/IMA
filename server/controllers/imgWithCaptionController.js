const imgWithCaption = require('../models/imgWithCaption');

module.exports.createImgWithCaption = async (req, res) => {
	try {
		const file = req.file;

		if (!file)
			return res.status(400).json({message: 'Изображение не выбрано'});

		const basePath = `${req.protocol}://${req.get('host')}/`;

		const imageWithCaption = new imgWithCaption({
			imgFor: req.file ? `${basePath}${req.file.path}`: '',
			caption: req.body.caption
		});

		await imageWithCaption.save();
		res.status(201).json({message: 'Картинка с описанием создана!', imageWithCaption})
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getImgWithCaption = async (req, res) => {
	try {

		const getImgWithCap = await imgWithCaption.find();

		res.status(200).json({getImgWithCap})

	}	catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.editImgWithCaption = async (req, res) => {
	try {
		const { id } = req.params;
		const getImgWithCap = await imgWithCaption.find();

		res.status(200).json({getImgWithCap})

	}	catch (err) {
		return res.status(500).json({message: err.message});
	}
};

