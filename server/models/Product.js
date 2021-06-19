const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	// productIndex: {
	// 	type: Number,
	// 	default: null
	// },
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
		default: ''
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
		default: ''
	},
	description: {
		type: String,
		default: undefined
	},
	shortDescr: {
		type: String,
		default: ''
	},
	subText: {
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
		type: Boolean || undefined,
		default: false
	},
	top: {
		type: Boolean || undefined,
		default: false
	},
	itsNew: {
		type: Boolean || undefined,
		default: false
	},
	totalCount: {
		type: Number,
		default: null
	},
}, {
	timestamps: true
});

productSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

productSchema.set('toJSON', {
	virtuals: true,
	versionKey:false,
});

module.exports = model('Product', productSchema);