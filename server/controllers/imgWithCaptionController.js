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

		console.log('imageWithCaption==>', imageWithCaption)
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};
