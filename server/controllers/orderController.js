const Order = require('../models/Order');

module.exports.createOrder = async (req, res) => {

	const { orders } = req.body;

	try {
		const order = new Order({
			email: req.body.email,
			phone: req.body.phone,
			order: req.body.payId,
			price: req.body.amount,
		});

		 await order.save();
		console.log({order})
		res.json({message: 'Заказ создан!', order});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};