const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Routes
const posts = require('./routes/posts');

// Set up database - connects to the mongo database
const mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
// mongoose.connect('mongodb://localhost/crud-app');
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
// Creates an instance of our app
const app = express();

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
const server = http.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server listening on: ${port}`);
});
