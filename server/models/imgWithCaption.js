const { Schema, model } = require('mongoose');

const imgWithCaptionSchema = new Schema({
	image: {
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

module.exports = model('ImgWithCaption', imgWithCaptionSchema);
