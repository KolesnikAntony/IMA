const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PlAYGROUND = 'https://developers.google.com/oauthplayground';

const {
	EMAIL_SERVICE_CLIENT_ID,
	EMAIL_SERVICE_CLIENT_SECRET,
	EMAIL_SERVICE_REFRESH_TOKEN,
	EMAIL_FROM
} = process.env;

const oauth2Client = new OAuth2(
	EMAIL_SERVICE_CLIENT_ID,
	EMAIL_SERVICE_CLIENT_SECRET,
	EMAIL_SERVICE_REFRESH_TOKEN,
	OAUTH_PlAYGROUND
);

const sendEmail = async (to, url, txt, tbody) => {
	oauth2Client.setCredentials({
		refresh_token: EMAIL_SERVICE_REFRESH_TOKEN
	});

	const accessToken = oauth2Client.getAccessToken();
	const smtpTransport = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			type: 'OAuth2',
			user: EMAIL_FROM,
			clientId: EMAIL_SERVICE_CLIENT_ID,
			clientSecret: EMAIL_SERVICE_CLIENT_SECRET,
			refreshToken: EMAIL_SERVICE_REFRESH_TOKEN,
			accessToken
		}
	});
// тестовый вариант добавление tbody
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to,
		subject: 'test',
		html: ` 
      <a href=${url} style="text-decoration: none">${txt}</a> 
			<div>${tbody}</div>
		`
	};

	await smtpTransport.sendMail(mailOptions, (err, info) => {
		if (err) return err;
		return info;
	});
};
module.exports = sendEmail;