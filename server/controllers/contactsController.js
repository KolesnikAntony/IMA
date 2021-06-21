const Contacts = require('../models/Contacts');

module.exports.createContacts = async (req, res) => {
	try {
		const newContacts = new Contacts({
			phone: req.body.phone,
			email: req.body.email,
			inst: req.body.inst,
			address: req.body.address,
			nip: req.body.nip,
			region: req.body.region
		});

		const contacts = await Contacts.find();

		console.log('contacts', {contacts})

		for (let val of contacts) {
			console.log('value of contacts===>', val);
		}

		// await newContacts.save();
		res.json({message: 'Контакты успешно добавлены', newContacts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.getContacts = async (req, res) => {
	try {
		const contacts = await Contacts.find();

		res.json({contacts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};

module.exports.editContacts = async (req, res) => {
	try {
		const { id } = req.params;
		const editContacts = { ...req.body };

		const contacts = await Contacts.findByIdAndUpdate(
			{ _id: id },
			{ $set: editContacts },
			{ new: true }
		);

		res.json({message: 'Контакты успешно обновлёны', contacts});
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
};