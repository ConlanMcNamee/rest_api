var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Movies = require("./movies/movies.js");
app.use(bodyParser.json());

app.use(express.static(__dirname + '/build'));

var moviesRouter = express.Router();
require('./routes/router.js')(moviesRouter);
app.use('/movies', moviesRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});