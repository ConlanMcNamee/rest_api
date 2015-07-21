var Movies = require("../movies/movies.js");
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_ULR || 'mongodb://localhost/movies');

module.exports = function(router) {

	router.get('/', function(req,res) {
		Movies.find({}, function(err, data) {
			if(err) {
				res.status(404);
				res.json({msg: "err"});
			} else {
				res.json(data);
				console.log(data);
			}
		});
	});

	router.get('/:id', function(req,res) {
		console.log('hit get/:id end point')
		console.log('req.parmas.id', req.params.id)
		var id = req.params.id;
		Movies.find({_id: req.params.id}, function(err, data) {
			if (err) {
				res.status(404);
				return res.json({msg:"err"});
			} else {
				res.status(200);
				console.log('dataga from get movies/:id', data);
				res.json(data);
			}
		});
	});

	router.post('/', function(req,res) {
		var movies = new Movies(req.body);
		console.log(movies);
		movies.save(function(err, wholemovie) {

			if(err) {
				res.status(404);
				res.json({msg: 'failed to save movie'});
			} else {
				console.log(wholemovie);
				res.status(200);
				res.json({msg: 'Movie successfully saved!', id: wholemovie._id});
			}
		});
	});

	router.put('/:id', function(req,res) {
		Movies.update({_id: req.params.id},{$set: req.body}, function(err, data) {
			if(err) {
				res.status(400);
				res.json({'msg': 'failed to update'});
				} else {
					res.status(200);
					res.json({msg: 'Movie successfully updated', id: data._id})
				}
		});
	});

	router.delete('/:id', function(req, res) {
		var id = req.params.id;
		Movies.find({_id: req.body.id}, function(err, data) {
			if(err) {
				res.status(404);
				res.json({msg:"err"});
			} else {
				res.status(200);
				res.json({msg: 'Movie successfully deleted'});
			}
		}).remove().exec();
	});
	router.delete('/', function(req, res) {
		Movies.remove({}, function(err, data) {
			if(err) {
				res.status(404);
				res.json({msg:"err"});
			} else {
				res.status(200);
				res.json({msg: 'Movie successfully deleted'});
			}
		});
	});
};