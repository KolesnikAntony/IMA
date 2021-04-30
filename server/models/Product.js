const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	title: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: ''
	},
});

module.exports = model('Product', productSchema);