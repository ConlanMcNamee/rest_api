process.env.MONGOLAB_URI = 'mongodb://localhost/movies_test';
var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require(__dirname + '/../server.js');
chai.use(chaiHttp);

var Movies = require("../movies/movies.js");

var testID = "";

describe('server post', function() {
	it('should post the new movie', function(done) {
		chai.request('http://localhost:3000/movies')
		.post('/')
		.send({"title": "Grand Budaphest Hotel", "director": "Wes Anderson", "year": 2014})
		.end(function(err, res) {
			// testID = res.body.id;
			expect(err).to.be.null;
			// expect(res).to.have.status(200);
			// expect(res.body[0]).to.eql('Wes Anderson');
			// done();
			expect(res.msg).to.eql('hello world');
		});
	});
});
describe('server get', function() {
	it('get the file located at ', function(done) {
		chai.request('http://localhost:3000/movies')
		.get('/' + testID)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body[0].director).to.eql('Wes Anderson');
			// expect(res.body.).to.eql('{ "_id" : ObjectId("55aae1bd67557616ceac3aeb"), "name" : "Gladiator", "director" : "Ridley Scott", "year" : "2000" }')
			done();
		});
	});
});

describe('server put', function() {
	it('should do update an update to the film', function(done) {
		chai.request('http://localhost:3000/movies')
		.put('/' + testID)
		.send({"year": 2013})
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body.msg).to.eql("Movie successfully updated");
			done();
		});
	});
});
describe('server get', function() {
	it('get the file located at ', function(done) {
		chai.request('http://localhost:3000/movies')
		.get('/' + testID)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body[0].year).to.eql(2013);
			// expect(res.body.).to.eql('{ "_id" : ObjectId("55aae1bd67557616ceac3aeb"), "name" : "Gladiator", "director" : "Ridley Scott", "year" : "2000" }')
			done();
		});
	});
});
describe('server post', function() {
	it('should post test movie to get deleted next', function(done) {
		chai.request('http://localhost:3000/movies')
		.post('/')
		.send({"title": "test", "director": "test", "year": 2015})
		.end(function(err, res) {
			testID = res.body.id;
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body.msg).to.eql('Movie successfully saved!')
			done();
		});
	});
});
describe('server get', function() {
	it('get the file located at ', function(done) {
		chai.request('http://localhost:3000/movies')
		.get('/' + testID)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body[0].year).to.eql(2015);
			// expect(res.body.).to.eql('{ "_id" : ObjectId("55aae1bd67557616ceac3aeb"), "name" : "Gladiator", "director" : "Ridley Scott", "year" : "2000" }')
			done();
		});
	});
});
describe('server delete', function() {
	it('should delete the test movie', function(done) {
		chai.request('http://localhost:3000/movies')
		.delete('/' + testID)
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.eql('{"msg":"Movie successfully deleted"}');
			done();
		});
	});
});
describe('server get', function() {
	it('get everything', function(done) {
		chai.request('http://localhost:3000/movies')
		.get('/')
		.end(function(err, res) {
			console.log('get all at end',res.body[0]);
			console.log('single delete ',testID);
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body[0].year).to.eql(2013);
			// expect(res.body.).to.eql('{ "_id" : ObjectId("55aae1bd67557616ceac3aeb"), "name" : "Gladiator", "director" : "Ridley Scott", "year" : "2000" }')
			done();
		});
	});
});
// describe('server delete all', function() {
// 	it('should remove everything', function(done) {
// 		chai.request('http://localhost:3000/movies')
// 		.delete('/')
// 		.end(function(err, res) {
// 			expect(err).to.be.null;
// 			expect(res).to.have.status(200);
// 			expect(res.text).to.eql('{"msg":"Movie successfully deleted"}');
// 			done();
// 		});
// 	});
// });