const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	email: String,
	phone: String,
	address: {
		street: String,
		building: String,
		flatt: String,
		kod: String,
		city: String,
	},
});

module.exports = model('UserProfile', userProfileSchema);