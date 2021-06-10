const Category = require('../models/Caterogry');
const Product = require('../models/Product');


module.exports.getCategories = async (req, res) => {
	// try {
	// 	const categories = await Category.find().select('name _id');
	// 	res.status(200).json({categories});
	// } catch (err) {
	// 	return res.status(500).json({message: err.message});
	// }


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

		// let queryStr = JSON.stringify(reqQuery);

		// queryStr = queryStr.replace( /\b(gt|gte|lt|lte|in)\b/g,
		// 	(match) => `$${match}`);

		query = Category.find(formattedParams);

		query2 = Category.find(formattedParams);

		if (req.query.sort) {
			const sortByArr = req.query.sort.split(',');

			const sortByStr = sortByArr.join(' ');

			query = query.sort(sortByStr);

			query2 = query2.sort(sortByStr);
		} else {
			query = query.sort('-price');

			query2 = query2.sort('-price');
		}

		const categoryCount = await query2.countDocuments();

		const pages = Math.ceil(categoryCount / pageSize);

		if (page > pages) {
			res.status(404).json({message: 'Страница не найдена.'})
		}

		const categories = await query
			.limit(pageSize)
			.skip(skip);

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

		const { id } = req.params;

		const deleteCategory = await Category.findOneAndRemove(id);

		if (!deleteCategory)
			return res.status(400).json({message: 'Категория не найдена'});

		res.json({message: 'Категория успешно удалена', deleteCategory});
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