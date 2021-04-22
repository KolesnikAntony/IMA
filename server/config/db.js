const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('Connected to MongoDB');
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;




