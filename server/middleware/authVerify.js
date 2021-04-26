const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.authVerify = async (req, res, next) => {
	try {
		const token = req.header('Authorization');
		if (!token)
			return res.status(400).json({message: 'Ошибка авторизации'});

		jwt.verify(token, process.env.JWT_ACCESS, (err, user) => {
			if (err)
				return res.status(400).json({message: 'Ошибка авторизации'});

			req.user = user;
			next();
		})
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.me = async (req, res, next) => {
	try {
		const rfToken = req.cookies.refreshtoken;
		console.log('rfToken--->', rfToken);
		if (!rfToken)
			return res.status(401).json({message: 'Пожалуйста войдите в аккаунт'});

		jwt.verify(rfToken, process.env.JWT_REFRESH, (err, user) => {
			if (err)
				return res.status(401).json({message: 'Пожалуйста войдите в аккаунт'});

				req.user = user;
				next();
		});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};
