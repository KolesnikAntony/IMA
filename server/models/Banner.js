const { Schema, model } = require('mongoose');

const bannerSchema = new Schema({
	content: {
		type: String,
		default: ''
	}
}, {
	timestamps: true
});

bannerSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

bannerSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('Banner', bannerSchema);