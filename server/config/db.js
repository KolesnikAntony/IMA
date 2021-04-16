const mongoose = require('mongoose');

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
	await mongoose.connect(URI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	console.log('Connected to MongoDB');
}

module.exports = connectDB;