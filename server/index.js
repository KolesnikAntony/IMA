require('dotenv').config({path: './.env'});
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { readdirSync } = require('fs');

const app = express();

connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(fileUpload({
	useTempFiles: true
}));

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});