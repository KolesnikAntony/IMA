const Category = require('../models/Caterogry');
const Product = require('../models/Product');


module.exports.getCategories = async (req, res) => {

	try {
		let query;
		let query2;

		const formattedParams = {};

		let reqQuery = { ...req.query };

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 12;
		const skip = (page - 1) * pageSize;

		let removeFields = ['sort', 'page', 'limit', 'skip'];
		removeFields.forEach((val) => delete reqQuery[val]);

		for (const [key, value] of Object.entries(reqQuery)) {
			formattedParams[key] = value.split(',');
		}

		query = Category.find(formattedParams);

		query2 = Category.find(formattedParams);

		const categoryCount = await query2.countDocuments();

		const pages = Math.ceil(categoryCount / pageSize);

		const categories = await query
			.limit(pageSize)
			.skip(skip);

		if (page > pages) {
			return res.status(404).json({message: 'Категории не найдены', categories})
		}

		res.status(200).json({
			count: categoryCount,
			page,
			pages,
			skip,
			pageSize,
			categories
		});
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
			if (newCategory.name.toLowerCase() === names.name.toLowerCase()) {
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
		let query = {};

		for (const [key, value] of Object.entries(req.params)) {
			query = { _id: value.split(',')};
		}

		const findCategory = await Category.find(query);

		if (findCategory.length == [])
			return res.status(400).json({message: 'Категория не найдена!'});

		await Category.deleteMany(query);

		res.json({message: `Категория ${findCategory.name} успешно удалён!`});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getCategoryById = async (req, res) => {
	try {

		const category = await Category.findById(req.params.id);

		if (!category)
			return res.status(400).json({message: 'Товар не найден!'});

		res.status(200).json({message: 'ok', category});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getCategoryWithProducts = async (req, res) => {

	try {

		const checkCategories = await Product.distinct('category');

		const category = await Category.find({_id: checkCategories}).select('name');

		res.status(200).json({ category });

	} catch (err) {
		return res.status(500).json({message: err.message});
	}

};