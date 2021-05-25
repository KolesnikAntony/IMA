require('dotenv').config({path: './.env'});
const connectDB = require('./config/db');
const express = require('express');
const cors = require ('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { me } = require('./middleware/authVerify');
//routes
const authRouter = require('./routes/authRouter');
const userProfile = require('./routes/userProfile');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');

const app = express();

connectDB();

app.use(morgan('dev'));
//если не загружать изображения в локал сторедж, то строка ниже не нужна
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.get('/api', me, async (req, res) => {
	res.json({message: 'work'});
});
app.use('/api', authRouter);
app.use('/api/user', userProfile);
app.use('/api', categoryRouter);
app.use('/api', productRouter);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});