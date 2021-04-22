const User = require('../models/User');

module.exports.authAdmin = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.user.id })

		if(user.role !== 'admin')
			return res.status(500).json({ message: 'Нет доступа' });

		next();
	}	catch (err) {
		return res.status(500).json({ message: err.message });
	}
};