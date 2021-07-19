// const jsSHA = require("jssha");
const stripe = require('stripe')(process.env.ST_SECRET_KEY);
// const uuid = require('uuid/v4');


// module.exports.payUMoneyPayment = (req, res) => {
// 	try {
//
// 		if (!req.body.txnid || !req.body.amount || !req.body.productinfo
// 			|| !req.body.firstname || !req.body.email) {
//
// 			res.send("Mandatory fields missing");
//
// 		} else {
// 			const pd = req.body;
//
// 			const hashString = process.env.MERCHANT_KEY // Merchant Key NETY
// 				+ '|' + pd.txnid
// 				+ '|' + pd.amount + '|' + pd.productinfo + '|'
// 				+ pd.firstname + '|' + pd.email + '|'
// 				+ '||||||||||' + process.env.MERCHANT_SALT // Your salt value NETY
//
// 			const sha = new jsSHA('SHA-512', "TEXT");
// 			sha.update(hashString)
//
// 			const hash = sha.getHash("HEX");
// 			res.json({ 'hash': hash });
// 		}
// 	} catch (err) {
// 		return res.status(500).json({ message: err.message });
// 	}
// };

// module.exports.paymentResponse = (req, res) => {
//
// 	try {
// 		const pd = req.body;
//
// 		//Generate new Hash
// 		const hashString = process.env.MERCHANT_SALT + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + config.payumoney.key
// 		const sha = new jsSHA('SHA-512', "TEXT");
// 		sha.update(hashString);
//
// 		const hash = sha.getHash("HEX");
//
// 		// Verify the new hash with the hash value in response
// 		if (hash === pd.hash) {
// 			res.json({'status': pd.status});
// 		} else {
// 			res.json({'status': "Error occurred" });
// 		}
// 	} catch (err) {
// 		return res.status(500).json({ message: err.message });
// 	}
//
// };

module.exports.stripePayment = async (req, res) => {

	const calculateOrderAmount = items => {

		const result = items.reduce((sum,{price, qty}) => sum + price * qty, 0);

		// console.log('result===>', result);

		return result;

	};

	const { amount } = req.body;

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'pln',
			payment_method_types: ['p24'],
		});

		res.send({
			clientSecret: paymentIntent.client_secret
		});

	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

};