const Order = require('../models/Order');

module.exports.createOrder = async (req, res) => {

	const { orders } = req.body;

	try {
		const order = new Order({
			email: orders.email,
			phone: orders.phone,
			order: orders.payId,
			price: orders.amount,
		});

		// await order.save();
		console.log({order})
		res.json({message: 'Заказ создан!', order});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};