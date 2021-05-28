require('dotenv').config({path: './.env'});

const Product = require('../models/Product');
const products = require('../data/product.json');
const connectDB = require('../config/db');


connectDB();

const seedProducts = async () => {
	try {
		await Product.deleteMany();
		console.log('Products are deleted');

		await Product.insertMany(products);
		console.log('All Products are added');
		process.exit();
		
	} catch (err) {
		console.log(err.message);
		process.exit();
	}
};

seedProducts();
