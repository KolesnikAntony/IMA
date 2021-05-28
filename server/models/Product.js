const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const productSchema = new Schema({
	id: {
		type: Number,
		default: null
	},
	title: {
		type: String,
		required: true,
		trim: true,
		maxlength: [200, 'имя продукта не должно превышать 100 символов'],
		default: ''
	},
	price: {
		type: Number,
		required: true,
		default: null
	},
	salePrice: {
		type: Number,
		default: null
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
		default: ''
	},
	description: {
		type: String,
		required: true,
		default: ''
	},
	shortDescr: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		required: true,
		default: ''
	},
	imageSrc: {
		type: String,
		default: ''
	},
	sale: {
		type: Boolean,
		default: false
	},
	top: {
		type: Boolean,
		default: false
	},
	itsNew: {
		type: Boolean,
		default: false
	},
	totalCount: {
		type: Number,
		default: null
	},
}, {
	timestamps: true
});

// productSchema.plugin(mongoosePaginate);

module.exports = model('Product', productSchema);