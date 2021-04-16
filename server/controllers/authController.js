const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { sendEmail } = require('../utils/sendEmail');



module.exports.register = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });

		res.status(201).json({success: true, message: 'Регистрация прошла успешно!'});

	} catch (error) {
		next(error);
	}
};

module.exports.login = async (req, res, next) => {
	const { email, password} = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('Неправильный емейл или пароль', 400));
	}
	
	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return next(new ErrorResponse('Пользователя не существует', 401));
		}

		const isMatch = await user.matchPasswords(password);

		if (!isMatch) {
			return next(new ErrorResponse('Неправильный пароль', 404));
		}

		sendToken(user, 201, res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message});
	}
};

module.exports.forgotpassword = async (req, res, next) => {
	const { email } = req.body;
	
	try {
		const user = await User.findOne({email});

		if (!user) {
			return next(new ErrorResponse('Email не найден', 404));
		}

		const resetToken = user.getResetPasswordToken();

		await user.save();

		const resetUtl = `http://localhost:5000/resetpassword/${resetToken}`;

		const message = `
			<h1>Запрос на восстановление пароля</h1>
			<p>Пожалуйста перейдите по ссылке ниже, чтобы установить новый пароль</p>
			<a href=${resetUtl} clicktracking="off">${resetUtl}</a>
		`;
		
		try {
			await sendEmail({
				to: user.email,
				subject: 'Запрос на восстановления пароля',
				text: message
			});

			res.status(200).json({success: true, data: 'Запрос отправлен на почту'})
		} catch (error) {
			user.getResetPasswordToken = undefined;
			user.getResetPasswordExpire = undefined;

			await user.save();

			return next(new ErrorResponse('Email не найден', 500));
		}
	} catch (error) {
		next(error);
	}
};

module.exports.resetpassword = async (req, res, next) => {
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetPasswordToken).digest('hex');
	
	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: {$gt: Date.now()}
		});

		if (!user) {
			return next (new ErrorResponse('Истек срок восстаноления', 400))
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: 'Пароль успешно изменён!'
		});
	} catch (error) {
		next(error);
	}
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({success: true, token});
};