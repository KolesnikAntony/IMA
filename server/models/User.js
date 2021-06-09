const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
	},
	name: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	address:
		{
			city: {
				type: String,
				default: ''
			},
			street: {
				type: String,
				default: ''
			},
			build: {
				type: String,
				default: ''
			},
			flat: {
				type: String,
				default: ''
			},
			kod: {
				type: String,
				default: ''
			},
		},
}, {
	timestamps: true
});

userSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey:false
});

module.exports = model('User', userSchema);