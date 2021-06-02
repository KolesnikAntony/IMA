const Product = require('../models/Product');
const Category = require('../models/Caterogry');
const fs = require('fs');

module.exports.createProduct = async (req, res) => {

	try {
		const category = await Category.findById(req.body.category);

		if (!category)
			return res.status(400).json({message: 'Неправильный ID категории'});

		const file = req.file;

		if (!file)
			return res.status(400).json({message: 'Изображение не выбрано'});

		const basePath = `${req.protocol}://${req.get('host')}/`;

		const product = new Product({
			productIndex: req.body.productIndex,
			title: req.body.title,
			price: req.body.price,
			salePrice: req.body.salePrice,
			category: req.body.category,
			description: req.body.description,
			shortDescr: req.body.shortDescr,
			color: req.body.color,
			imageSrc: req.file ? `${basePath}${req.file.path}` : '',
			sale: req.body.sale,
			top: req.body.top,
			itsNew: req.body.itsNew,
			totalCount: req.body.totalCount
		});

		// отмена загрузки изображения в локальное хранилище
		// fs.unlinkSync(req.file.path);

		await product.save();

		res.status(201).json({message: 'Продукт успешно создан', product});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getProducts = async (req, res) => {

	try {
		let query;
		let query2;

		let reqQuery = { ...req.query };

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 12;
		const skip = (page - 1) * pageSize;

		let removeFields = ['sort', 'page', 'limit', 'skip'];
		removeFields.forEach((val) => delete reqQuery[val]);

		let queryStr = JSON.stringify(reqQuery);

		queryStr = queryStr.replace( /\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`);

		query = Product.find(JSON.parse(queryStr));

		query2 = Product.find(JSON.parse(queryStr));

		if (req.query.sort) {
			const sortByArr = req.query.sort.split(',');

			const sortByStr = sortByArr.join(' ');

			query = query.sort(sortByStr);

			query2 = query2.sort(sortByStr);
		} else {
			query = query.sort('-price');

			query2 = query2.sort('-price');
		}

		const productsCount = await query2.countDocuments();

		const pages = Math.ceil(productsCount / pageSize);

		if (page > pages) {
			res.status(404).json({message: 'Страница не найдена.'})
		}

		const products = await query.populate('category', 'name')
			.limit(pageSize)
			.skip(skip)
			.lean();


		res.status(200).json({
			count: productsCount,
			page,
			pages,
			skip,
			pageSize,
			products
		});
		console.log('products.length', products.length);
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getProductById = async (req, res) => {
	try {

		const product = await Product.findById(req.params.id)
			.select('title shortDescr description price salePrice subText imageSrc')
			.lean();

		res.status(200).json({message: 'ok', product});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getColorAndCategory = async (req, res) => {

	try {
		const formattedParams = {};

		let queryArr = { ...req.query }

		for (const [key, value] of Object.entries(queryArr)) {
			formattedParams[key] = value.split(',');
		}

		console.log({formattedParams});

		const products = await Product.find(formattedParams);

		res.status(200).json({count: products.length, products});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.updateCollection = async (req, res) => {
	try {
    //here we change the values of the collection, if necessary
		const newProducts = await Product.updateMany( {}, {$rename:{"aaaaa": "productIndex"}});

		res.status(200).json({message: 'show you all products from db', newProducts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};
