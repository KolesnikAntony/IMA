const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: [100, 'имя категории не должно превышать 100 символов'],
		default: ''
	}
}, {
	timestamps: true
});

module.exports = model('Category', categorySchema);