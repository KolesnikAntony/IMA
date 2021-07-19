
const imgWithCaption = require('../models/imgWithCaption');
const fs = require('fs');

module.exports.createImgWithCaption = async (req, res) => {
	try {
		const file = req.file;

		if (!file)
			return res.status(400).json({message: 'Изображение не выбрано'});

		const basePath = `${req.protocol}://${req.get('host')}/`;

		const imageWithCaption = new imgWithCaption({
			image: req.file ? `${basePath}${req.file.path}`: '',
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

		const basePath = `${req.protocol}://${req.get('host')}/`;

		const findImg = await imgWithCaption.findById(id);

		let replacePath = findImg.image.replace(basePath, '');

		const edited = { ...req.body };

		if (req.file) {
			edited.image = basePath + req.file.path;
			fs.unlinkSync(replacePath);
		}

		const editImgWithCap = await imgWithCaption.findByIdAndUpdate(
			{ _id: id },
			{ $set: edited },
			{ new: true }
		);


		res.status(200).json({message: 'Данные успешно обновлены', editImgWithCap});

	}	catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.deleteImgWithCaption = async (req, res, next) => {
	try {

		const { id } = req.params;

		const basePath = `${req.protocol}://${req.get('host')}/`;

		const findImg = await imgWithCaption.findById(id);

		let replacePath = findImg.image.replace(basePath, '');

		let query = {};

		for (const [key, value] of Object.entries(req.params)) {
			query = { _id: value.split(',')};
		}

		const findImgWithCap = await imgWithCaption.find(query);

		if (findImgWithCap.length === [])
			return res.status(400).json({message: 'Картинка не найдена!'});

		await imgWithCaption.deleteMany(query);

		fs.unlinkSync(replacePath);

		res.json({message: 'Товар успешно удалён!', findImgWithCap});

	}	catch (err) {
		return res.status(500).json({message: err.message});
	}
};

