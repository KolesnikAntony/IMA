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
	let page = parseInt(req.query.page) || 1;
	let limit = parseInt(req.query.limit) || 8;

	try {
		let query;

		let reqQuery = { ...req.query };

		let removeFields = ['sort', 'page', 'limit', 'skip'];
		removeFields.forEach((val) => delete reqQuery[val]);

		let queryStr = JSON.stringify(reqQuery);

		queryStr = queryStr.replace( /\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`);

		query = Product.find(JSON.parse(queryStr));

		if (req.query.sort) {
			const sortByArr = req.query.sort.split(',');

			const sortByStr = sortByArr.join(' ');

			query = query.sort(sortByStr);
		} else {
			query = query.sort('-price');
		}

		const products = await query.populate('category', 'name');

		res.json({count: products.length, products});
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

