const express = require('express');
const app = express();
const path = require('path');
var expressValidator = require('express-validator');
const bodyParser = require('body-parser');

/**
 * basically we use this but if palyload is large we have to increase the limit
 * app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
 */

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(expressValidator());

/* **********************************setting headers and methods************************** */
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"*"
	);
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
		return res.status(200).json({});
	}
	next();
});

app.use(express.static(__dirname + '/storage/uploads/user-images'));

/* **********************************Initializing Routes ********************************* */
const registerRoute = require('./api/routes/register');
app.use('/register', registerRoute);

const loginRoute = require('./api/routes/login');
app.use('/login', loginRoute);

const userRoute = require('./api/routes/user');
app.use('/user', userRoute);

const eventRoute = require('./api/routes/event');
app.use('/event', eventRoute);

const gNRoute = require('./api/routes/gNarrative');
app.use('/gn', gNRoute);

const recRoute = require('./api/routes/gnRecorder');
app.use('/recorder', recRoute);

const imgConRoute = require('./api/routes/imgConverter');
app.use('/img', imgConRoute);

const sfRoute = require('./api/routes/salesForce');
app.use('/sf', sfRoute);

const hftRoute = require('./api/routes/hft');
app.use('/hft', hftRoute);

const pmRoute = require('./api/routes/pm');
app.use('/pm', pmRoute);

const edRoute = require('./api/routes/ed');
app.use('/ed', edRoute);

const spRoute = require('./api/routes/sp');
app.use('/sp', spRoute);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('helpfortrauma-react/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'helpfortrauma-react', 'build', 'index.html'));
	});

	// app.use('/app', express.static(path.join(__dirname, 'helpfortrauma-react/build')))
	// // when going to `/`, serve the files at mainApp/build/* as static files
	// app.use(express.static(path.join(__dirname, 'landing-page')))

	// // These are necessary for routing within react
	// app.get('app/*', (req, res) => {
	// 	res.sendFile(path.join(__dirname + '/helpfortrauma-react/build/index.html'))
	// })

	// app.get('*', (req, res) => {
	// 	res.sendFile(path.join(__dirname + '/landing-page/index.html'));
	// });
}

module.exports = app;