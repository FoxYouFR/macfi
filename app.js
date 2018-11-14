/***************************************

  Main application
  Kolly Florian
  Version 1.0
  Modification:

****************************************/

const serverless = require('serverless-http');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const express = require('express');
const config = require('./routes/config.json')

const app = express();

const oneWeek = 604800000;

// The views are using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneWeek }));
app.set('trust proxy', 1);

// prepare the session to use it with express-session
const session = {
  secret: 'fdsfsadfd43tegasdcvgeu4' // TODO: place it in config
  resave: false,
  saveUninitialized: true
};

// When uploaded, secure the cookies
if(process.env.PORT){
  session.cookie = { secure : true };
}
app.use(expressSession(session));

app.use('/', require('./routes/routes'));

// 404 fallback
app.use((req, res, next) => {
  res.render('404');
  next();
});

http.createServer(app).listen(80, () => {
  console.log('Server running on port 80');
});
