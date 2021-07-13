const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendEmail');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.EMAIL_SERVICE_CLIENT_ID);
// const { CLIENT_URL } = process.env;

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
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({message: 'Емейл не найден'});

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({message: 'Неправильный пароль'});

		const refreshtoken = createRefreshToken({id: user._id});
		res.cookie('refreshtoken', refreshtoken, {
			httpOnly: true,
			path: '/api',
			maxAge: 24*60*60*1000
		});

		res.json({message: `Добро пожаловать ${user.email}`});

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

		const accessToken = createActivationToken({ id: user.id });
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
		res.clearCookie('refreshtoken', {path: '/api'});
		return res.json({ message: 'Выход успешно выполнен' });
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

		res.status(200).json({message: 'Пользователь удалён!', deleteUser});
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports.googleLogin = async (req, res) => {
	try {
		const { tokenId } = req.body;

		const verify = await client.verifyIdToken({ idToken: tokenId,  audience: process.env.EMAIL_SERVICE_CLIENT_ID });

		const { email_verified, email, given_name, picture } = verify.payload;

		const password = email + process.env.GOOGLE_SECRET;

		const hashedPass = await bcrypt.hash(password, 12);

		if (!email_verified)
			return res.status(400).json({message: 'Ошибка проверки Емейл'});

		if (email_verified) {
			const user = await User.findOne({ email });
			if (user) {
				const isMatch = await bcrypt.compare(password, user.password)
				if (!isMatch) return res.status(400).json({message: 'Неправильный пароль'});

				const refreshtoken = createRefreshToken({id: user._id});

					res.cookie('refreshtoken', refreshtoken, {
						httpOnly: true,
						path: '/api',
						maxAge: 24*60*60*1000
					});

					res.json({ message: 'Авторизация прошла успешно!'});
			} else {
				const newUser = new User({
					email,
					password: hashedPass,
					avatar: picture,
					name: given_name
				});
	
				await newUser.save();

				const refreshtoken = createRefreshToken({id: newUser._id});
				res.cookie('refreshtoken', refreshtoken, {
					httpOnly: true,
					path: '/api',
					maxAge: 24*60*60*1000
				});
	
				res.json({ message: 'Авторизация прошла успешно!'});
			}
		}
	}	catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports.facebookLogin = async (req, res) => {
	try {
		const {accessToken, userID} = req.body;

		const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

		const data = await fetch(URL).then(res => res.json()).then(res => {return res});

		const {email, name, picture} = data;

		const password = email + process.env.FACEBOOK_SECRET;

		const passwordHash = await bcrypt.hash(password, 12);

		const user = await User.findOne({email});

		if(user){
			const isMatch = await bcrypt.compare(password, user.password);

			if(!isMatch)
				return res.status(400).json({message: "Неправильный пароль"});

			const refreshtoken = createRefreshToken({id: user._id});

			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true,
				path: '/api',
				maxAge: 24*60*60*1000
			});

			res.json({message: "Авторизация прошла успешно!"});

		}else{
			const newUser = new User({
				name, email, password: passwordHash, avatar: picture.data.url
			});

			await newUser.save()

			const refreshtoken = createRefreshToken({id: newUser._id});

			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true,
				path: '/api',
				maxAge: 24*60*60*1000
			});

			res.json({message: "Авторизация прошла успешно!"});
		}

	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.iosLogin = async (req, res) => {
	try {
		const { token, email, apple_id } = req.body;

		const password = email + process.env.IOS_SECRET;

		const passwordHash = await bcrypt.hash(password, 12);

		const user = await User.findOne({email});

		if(user) {

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res.status(400).json({message: "Неправильный пароль"});

			const refreshtoken = createRefreshToken({id: user._id});

			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true,
				path: '/api',
				maxAge: 24 * 60 * 60 * 1000
			});
		} else {
			const newUser = new User({
				apple_id, email, password: passwordHash
			});

			await newUser.save()

			const refreshtoken = createRefreshToken({id: newUser._id});

			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true,
				path: '/api',
				maxAge: 24*60*60*1000
			});

			res.json({message: "Авторизация прошла успешно!"});
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
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
	return jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '60m'});
};
