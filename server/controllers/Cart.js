const Product = require('../models/Product');

module.exports.cartFilter = async ( req, res ) => {
	try {
		let query = {};

		if (req.query.id) {
			query = {_id: req.query.id.split(',')}
		}

		const cartItems = await Product.find(query)
			.select('title price salePrice imageSrc');

		res.status(200).json({message: 'Ok',count: cartItems.length,  cartItems});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};