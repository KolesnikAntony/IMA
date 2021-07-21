const Order = require('../models/Order');
const sendMail = require('../utils/sendEmail');

module.exports.createOrder = async (req, res) => {

	const { email } = req.body;

	try {
		const order = new Order({
			email: email,
			phone: req.body.phone,
			order: req.body.payId,
			price: req.body.amount,
		});

		const url = ` ${process.env.CLIENT_URL}/api/order/${order._id} `

		console.log({url});

		await sendMail(email, url, `Детали заказа №${order._id}`, order);

		await order.save();


		res.json({message: `Заказ создан! Детали заказа отправлены на почту ${email}`, order});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getOrders = async (req, res) => {

	try {

	const orders = await Order.find();

		res.status(200).json({ orders});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getOrderById = async (req, res) => {

	const { id } = req.params;

	try {

	const order = await Order.findById(id);

		if (!order)
			return res.status(400).json({message: 'Заказ не найдет!'});

		res.status(200).json({ order});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};