const fs = require('fs');

module.exports = async (req, res, next) => {
	try {
		if (!req.files || Object.keys(req.files).length === null)
			return res.status(400).json({message: 'Нет файлов для загрузки'});

		const file = req.files.file;

		console.log(file);
		if (file.size > 1024 * 1024 * 5) {
			removeTmp(file.tempFilePath)
			return res.status(400).json({message: 'Файл слишком большой'});
		}

		if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
			removeTmp(file.tempFilePath)
			return res.status(400).json({message: 'Некорректный формат изображения'});
		}

		next();
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

const removeTmp = (path) => {
	fs.unlink(path, err =>{
		if (err) throw err;
	})
};
