require('dotenv').config({path: './.env'});
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const errorHandler = require('./middleware/error');
const privateRouter = require('./routes/private');



//Connect Mongo
connectDB();


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
	useTempFiles: true
}));

app.use('/auth', authRouter);
app.use('/private', privateRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});