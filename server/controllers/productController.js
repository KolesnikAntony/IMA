const Product = require('../models/Product');

module.exports.createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);

		res.status(201).json({message: 'ok', product});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getProducts = async (req, res) => {


	try {
		let query = {};

		let reqQuery = { ...req.query };

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 8;
		const skip = (page - 1) * pageSize;
		const total = await Product.countDocuments();

		const pages = Math.ceil(total / pageSize);

		if (page > pages) {
			res.status(404).json({message: 'Страница не найдена.'})
		}

		let removeFields = ['sort', 'page', 'limit', 'skip'];
		removeFields.forEach((val) => delete reqQuery[val]);

		let queryStr = JSON.stringify(reqQuery);

		queryStr = queryStr.replace( /\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`);

		console.log('queryStr--->', queryStr);

		query = Product.find(JSON.parse(queryStr));

		if (req.query.sort) {
			const sortByArr = req.query.sort.split(',');

			const sortByStr = sortByArr.join(' ');

			query = query.sort(sortByStr);
		} else {
			query = query.sort('-price');
		}

		const products = await query.populate('category', 'name')
			.limit(pageSize)
			.skip(skip)
			.lean();

		res.status(200).json({
			count: products.length,
			page,
			pages,
			products
		});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getNewProducts = async (req, res) => {
	try {
		const count = req.params.count ? req.params.count : 0;
		const newProducts = await Product.find({itsNew: true}).limit(+count);
		// const productCount = await Product.countDocuments();

		res.status(200).json({message: 'show u al products from db', newProducts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

