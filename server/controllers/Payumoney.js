const jsSHA = require("jssha");

module.exports.payUMoneyPayment = (req, res) => {
	try {

		if (!req.body.txnid || !req.body.amount || !req.body.productinfo
			|| !req.body.firstname || !req.body.email) {

			res.send("Mandatory fields missing");

		} else {
			const pd = req.body;

			const hashString = process.env.MERCHANT_KEY // Merchant Key NETY
				+ '|' + pd.txnid
				+ '|' + pd.amount + '|' + pd.productinfo + '|'
				+ pd.firstname + '|' + pd.email + '|'
				+ '||||||||||' + process.env.MERCHANT_SALT // Your salt value NETY

			const sha = new jsSHA('SHA-512', "TEXT");
			sha.update(hashString)

			const hash = sha.getHash("HEX");
			res.json({ 'hash': hash });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

module.exports.paymentResponse = (req, res) => {

	try {
		const pd = req.body;

		//Generate new Hash
		const hashString = process.env.MERCHANT_SALT + '|' + pd.status + '||||||||||' + '|' + pd.email + '|' + pd.firstname + '|' + pd.productinfo + '|' + pd.amount + '|' + pd.txnid + '|' + config.payumoney.key
		const sha = new jsSHA('SHA-512', "TEXT");
		sha.update(hashString);

		const hash = sha.getHash("HEX");

		// Verify the new hash with the hash value in response
		if (hash === pd.hash) {
			res.json({'status': pd.status});
		} else {
			res.json({'status': "Error occurred" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

};