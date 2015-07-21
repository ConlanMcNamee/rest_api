var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Movies = require("./movies/movies.js");
app.use(bodyParser.json());


var moviesRouter = express.Router();
require('./routes/router.js')(moviesRouter);
app.use('/movies', moviesRouter);










app.listen(3000, function() {
	console.log('server running');
});