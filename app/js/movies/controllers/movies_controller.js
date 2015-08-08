'use strict';

module.exports = function(app) {
	app.controller('moviesController', ['$scope', '$http', function($scope, $http) {
		$scope.movies = [];
		$scope.errors = [];

		$scope.getAll = function() {
			$http.get('/movies/')
				.then(function(res) {
					console.log(res.data);
					$scope.movies = res.data;
				}, function(res) {
					$scope.errors.push({msg: 'could not find movies from server'});
					console.log(res.data);
				});
		};
		$scope.create = function(movie) {
			
			console.log($scope.newMovie)
			// var movie = $scope.newMovie;
			$http.post('/movies/', movie)
				.then(function(res) {
					$scope.movies.push(res.data);
					$scope.newMovie = null;

				}, function(res) {
					$scope.errors.push(res.data);
					$scope.newMovie = null;

				})
		};
		$scope.destroy = function(movie) {
			$http.delete('/movies/' + movie._id)
				.then(function(res) {
					$scope.movies.splice($scope.movies.indexOf(movie), 1);
				}, function(res) {
					console.log(res.data);
					$scope.errors.push(res.data);
				});
		};
		$scope.update = function(movie) {
			$http.put('/movies/' + movie._id, movie)
				.then(function(res) {
					movie.editing = false;
				}, function(res) {
					movie.editing = false;
					console.log(res.data);
				})
		};
		$scope.cancel = function(movie) {
			movie.title = movie.oldTitle;
			movie.editing = false;
		};
		$scope.edit = function(movie) {
			movie.editing = true;
			movie.oldTitle = movie.title;
			console.log(movie.oldMovie);
		}
	}]);
};