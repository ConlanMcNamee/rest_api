var mongoose = require('mongoose');


var moviesSchema = mongoose.Schema({ 
	title: String, 
	director: String, 
	year: Number
});

moviesSchema.path("year").validate(function(v) {
	return v > 1895;
},"No film was made before 1986");

module.exports = mongoose.model('Movies', moviesSchema);