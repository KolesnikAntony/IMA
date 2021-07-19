const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	order: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
});


orderSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('Order', orderSchema);