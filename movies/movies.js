var mongoose = require('mongoose');


var moviesSchema = mongoose.Schema({ 
	title: String, 
	director: String, 
	year: Number
});

module.exports = mongoose.model('Movies', moviesSchema);