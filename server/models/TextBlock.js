const { Schema, model } = require('mongoose');

const textBlockSchema = new Schema({
	tBlock: {
		type: String,
		default: ''
	}
}, {
	timestamps: true
});

textBlockSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

textBlockSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('TextBlock', textBlockSchema);