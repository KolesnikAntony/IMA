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

userProfileSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

userProfileSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('UserProfile', userProfileSchema);