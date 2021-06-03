const Category = require('../models/Caterogry');
const Product = require('../models/Product');


module.exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find().select('name _id');
		res.status(200).json({categories});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getCategoriesAndColors = async (req, res) => {

	const getUniqueNames = (array) => {
		return array.filter((e, i, a) => a.indexOf(e) === i);
	};

	try {

		const categories = await Category.find().select('name');

		const color = await Product.find().select('color');

		const colors = getUniqueNames(color.map(item => item.color));

		const category = getUniqueNames(categories.map(item => item));

		res.status(200).json({message: 'OK', category, colors});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.addCategory = async (req, res) => {
	try {
		const newCategory = new Category({
			name: req.body.name
		});

		const categories = await Category.find();

		for (let names of categories) {
			if (newCategory.name === names.name) {
				return res.status(400).json({message: `Категория ${req.body.name} занята, попробуйте другое имя`});
			}
		}

		await newCategory.save();
		res.json({message: 'Категория успешно создана', newCategory});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.removeCategory = async (req, res) => {
	try {
		const deleteCategory = await Category.findOneAndRemove(req.body);

		if (!deleteCategory)
			return res.status(400).json({message: 'Категория не найдена'});

		res.json({message: 'Категория успешно удалена', deleteCategory});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};