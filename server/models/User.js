const crypto = require('crypto');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Пожалуйста, укажите емейл'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Пожалуйста, укажите правильный емейл",
		],
	},
	password: {
		type: String,
		required: [true, 'Пожалуйста, укажите пароль'],
		minlength: 6,
		select: false
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	role: {
		type: Number,
		default: 0
	},
	cart: {
		type: Array,
		default: []
	},
}, {
	timestamps: true
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id}, process.env.JWT_SECRET,
		{expiresIn: process.env.JWT_EXPIRE});
};

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);

	return resetToken;
};
module.exports = mongoose.model('user', userSchema);