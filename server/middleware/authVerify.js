const jwt = require('jsonwebtoken');

module.exports.me = async (req, res, next) => {
	try {
		const rfToken = req.cookies.refreshtoken;
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