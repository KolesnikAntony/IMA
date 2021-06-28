const { Schema, model } = require('mongoose');

const contactsSchema = new Schema({
	phone: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	inst: {
		type: String,
		trim: true,
		default: ''
	},
	address: {
		type: String,
		trim: true,
		default: ''
	},
	nip: {
		type: String,
		trim: true,
		default: ''
	},
	region: {
		type: String,
		trim: true,
		default: ''
	},
}, {
	timestamps: true
});

contactsSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

contactsSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('Contacts', contactsSchema);