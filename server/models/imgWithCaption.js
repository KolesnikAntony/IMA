const { Schema, model } = require('mongoose');

const imgWithCaptionSchema = new Schema({
	imgFor: {
		type: String,
		default: ''
	},
	caption: {
		type: String,
		default: ''
	}
}, {
	timestamps: true
});

imgWithCaptionSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

imgWithCaptionSchema.set('toJSON', {
	virtuals: true,
	versionKey:false,
});

module.exports = model('imgWithCaption', imgWithCaptionSchema);
