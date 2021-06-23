const Product = require('../models/Product');

module.exports.cartFilter = async ( req, res ) => {
	try {
		let query;

		if (req.query.id) {
			query = {_id: req.query.id.split(',')};
		} else {
			query = {_id: req.query.id = []};
		}

		const cartItems = await Product.find(query)
			.select('title price salePrice imageSrc');

		console.log('cartItems===>', {cartItems})

		if ( cartItems.length == [] )
			return res.status(404).json({message: 'Корзина пуста'});

		res.status(200).json({message: 'Ok', qty: 1,  cartItems});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};