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
			.select('title price salePrice imageSrc qty');

		if ( cartItems.length == [] )
			return res.json({cartItems});

		res.status(200).json({message: 'Ok',  cartItems});

	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};