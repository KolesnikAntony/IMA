const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Пожалуйста, укажите емейл'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Пожалуйста, укажите пароль']
	},
	role: {
		type: String,
		default: 'user'
	},
	cart: {
		type: Array,
		default: []
	},
	avatar: {
		type: String,
		default: ''
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('user', userSchema);