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
			id: req.body.id,
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

		let reqQuery = { ...req.query };

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 12;
		const skip = (page - 1) * pageSize;
		const total = await Product.countDocuments();

		let pages = Math.ceil(total / pageSize);

		if (page > pages) {
			res.status(404).json({message: 'Страница не найдена.'})
		}

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

		const products = await query.populate('category', 'name')
			.limit(pageSize)
			.skip(skip)
			.lean();

		// if (products.length > 8) {
		// 	pages =
		// }

		res.status(200).json({
			count: products.length,
			page,
			pages: Math.ceil(products.length / pageSize),
			products
		});
		console.log('products.length', products.length);
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getNewProducts = async (req, res) => {
	try {
		// let page = parseInt(req.query.page) || 1;
		// const pageSize = parseInt(req.query.limit) || 8;
		//
		// let query = { ...req.query };
		// await Product.find(query)
		// 	.sort({ price: -1 })
		// 	.skip((page - 1) * pageSize)
		// 	.limit(pageSize)
		// 	.exec((err, doc) => {
		// 		if (err) {
		// 			return res.json(err);
		// 		}
		// 		Product.estimatedDocumentCount(query).exec((count_error, count) => {
		// 			if (err) {
		// 				return res.json(count_error);
		// 			}
		// 			return res.json({
		// 				total: count,
		// 				page: page,
		// 				pageSize: doc.length,
		// 				pages: doc.length,
		// 				products: doc
		// 			});
		// 		});
		// 	});

		// const page = parseInt(req.query.page) || 1;
		// const pageSize = parseInt(req.query.limit) || 8;
		// const skip = (page - 1) * pageSize;
		// const total = await Product.countDocuments();
		//
		// const pages = Math.ceil(total / pageSize);
		//
		// const newProducts = await Product.find(req.query)
		// 	.populate('category', 'name')
		// 	.lean();
		//
		// const newProducts = await Product.find(req.query)
		//
		// res.status(200).json({message: 'show u al products from db',count: newProducts.length, pages, newProducts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getColorAndCategory = async (req, res) => {
	try {

		// let query = {...req.query};
		//
		// if (req.query.color !== '') {
		// 	query.color = req.query.color.split(',');
		// }
		//
		// 	if (req.query.category !== '') {
		// 		query.category = req.query.category.split(',');
		// 	}
		// }
		// const splitValues = Object.values(query).join('');
		// const argsArr = splitValues.split(',');
		// const getKeys = Object.keys(query).join('');
		// console.log('getKeys', getKeys);
		// console.log('argsArr', argsArr);
		// const completeQuery = { req.query +':' + argsArr }
		// query = completeQuery;
		// console.log('query', completeQuery);

		// if (req.query.category !== null) query.category = req.query.category.split(',') : query;
		// await multiQuery();
		//{category:['609308afbe7adb4340ee8dde', '609308fe87772a1a00865c1a']} нужно сделать хотябы вот так

		let query = {};
		query = Product.find();
		if (query.color && query.color.length > 0) query.color = {$in : query.color};
		console.log('query', query.color);

		const newProducts = await query
			.populate('category', 'name')
			.lean();

		res.status(200).json({message: 'show you all products from db', count: newProducts.length, newProducts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

// module.exports.getNewProducts = async (req, res) => {
// 	try {
//
// 		const
//
// 		const newProducts = await Product.find(req.query)
// 			.populate('category', 'name')
// 			.lean();
//
// 		res.status(200).json({message: 'show u al products from db',count: newProducts.length, newProducts});
// 	} catch (err) {
// 		return res.status(500).json({message: err.message});
// 	}
// };

