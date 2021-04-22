const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendEmail');


module.exports.signup = async (req, res) => {

	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({message: 'Пж заполните все поля'});

		if (!validateEmail(email))
			return res.status(400).json({message: 'Некорректный Емейл'});

		const user = await User.findOne({ email });

		if (user)
			return res.status(400).json({message: 'Почта уже занята кст'});

		if (password.length < 6)
			return res.status(400).json({message: 'Пароль должен быть не меньше 6 символов'});

		const hashedPass = await bcrypt.hashSync(password, 12);

		const newUser = { email, password: hashedPass };

		const activationToken = createActivationToken(newUser);

		const url = ` ${process.env.CLIENT_URL}/activate/${activationToken} `;

		sendMail(email, url, 'Активируйте свою почту');

		res.status(201).json({message: 'Регистрация прошла успешно! Пж активируйте указанный Емейл'});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.activateEmail = async (req, res) => {
	try {
		const { activationToken } = req.body;

		const user = jwt.verify(activationToken, process.env.JWT_SECRET);

		const { email, password } = user;

		const checkUser = await User.findOne({ email });

		if (checkUser)
			return res.status(400).json({message: 'Пользователь уже используется'});

		const newUser = new User({ email, password });
		await newUser.save();

		res.status(201).json({message: 'Акаунт успешно активирован'});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.login = async (req, res, next) => {
	
	try {
		const { email, password} = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({message: 'Емейл не найден'});

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch)
			return res.status(400).json({message: 'Неправильный пароль'});

		const refreshToken = createRefreshToken({id: user._id});
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/login/refresh_token',
			maxAge: 7*24*60*60*1000
		});

		res.status(200).json({message: 'Авторизация прошла успешно!'});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.accessToken = async (req, res) => {
	try {
		const rfToken = req.cookies.refreshToken;
		if (!rfToken)
			return res.status(400).json({message: 'Пожалуйста войдите в аккаунт'});

		jwt.verify(rfToken, process.env.JWT_REFRESH, (err, user) => {
			if (err)
				return res.status(400).json({message: err.message});

			const accessToken = createAccessToken({ id: user.id});
			res.json({accessToken});
		});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: 'Емейл не найден' });

		const accessToken = createAccessToken({ id: user.id });
		const url = ` ${process.env.CLIENT_URL}/login/reset/${accessToken} `;

		sendMail(email, url, 'Сбросить пароль');

		res.json({ message: 'Доступ на сброс пароля отправлен на почту' });
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}

module.exports.resetPassword = async (req, res) => {
  try {
	  const { password } = req.body;
	  console.log(password);

	  const hashedPass = await bcrypt.hashSync(password, 12);

	  await User.findOneAndUpdate({ _id: req.user.id }, {
	  	password: hashedPass
	  });

	  res.status(200).json({ message: 'Пароль успешно изменён!' });

  }	catch (err) {
	  return res.status(500).json({ message: err.message });
  }
};

module.exports.getUserInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	}	catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.getAllUserInfo = async (req, res) => {
	try {
		const allUsers = await User.find().select('-password');

		res.json(allUsers);
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

module.exports.logout = async (req, res) => {
	try {
		res.clearCookie('refreshToken', { path: '/login/refresh_token' });
		return res.json({ message: 'Выход из системы успешно выполнен' });
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

module.exports.updateUser = async (req, res) => {
	try {
		const { avatar } = req.body;
		const updateUser = await User.findOneAndUpdate(
			{ _id: req.user.id },
			{ avatar }
		);
		res.status(200).json({ message: 'Профиль успешно обновлён!' });
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports.updateUserRole = async (req, res) => {
	try {
		const { role } = req.body;
		const updateRole = await User.findOneAndUpdate(
			{ _id: req.params.id }, { role }

		);
		res.status(200).json(updateRole);
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
			const deleteUser = await User.findByIdAndDelete(req.params.id);

		res.status(200).json({message: 'Пользователь удалён!'});
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'});
};

const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '20m'});
};

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '7d'});
};
