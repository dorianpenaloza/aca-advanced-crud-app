const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/crud-app');

const databaseUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/crud-app';
mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl)
  .then(() => console.log((`[mongoose] Connected to MongoDB!`)))
  .catch(err => {
    return console.log((`[mongoose] Unable to connect to MongoDB! ${err}`));
  });

// Creates an instance of our app
const app = express();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
app.set('port', port);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // The parser only accepts UTF-8 encoding.
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Sets our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sets our directory for serving static files
app.use(express.static('public'));

// Registering a simple route to redirect to '/posts'
app.get('/', (req, res, next) => {
  res.redirect('/posts');
});

// Registers our `posts` routes name-spaced under '/posts'
app.use('/posts', posts);

//Error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.messsage,
    error: err
  });
});

// Set up our server
// const server = http.createServer(app);
// const port = process.env.PORT || 8080;
// server.listen(port, () => {
//   console.log(`Server listening on: ${port}`);
// });
app.listen(port, () => console.log((`[express] Listening on port: ${port} [${env}]`)))
