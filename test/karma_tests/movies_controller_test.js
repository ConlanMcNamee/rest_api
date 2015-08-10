
require('../../app/js/client.js');
require('angular-mocks');

describe('movies controller', function() {
	var $ControllerContructor;
	var $httpBackend;
	var $scope

	beforeEach(angular.mock.module('moviesApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('should be able to create a controller', function() {
		var moviesController = $ControllerConstructor('moviesController', {$scope: $scope});
		expect(typeof moviesController).toBe('object');
		expect(typeof $scope.getAll).toBe('function');
		expect(Array.isArray($scope.movies)).toBe(true);
	});

	describe('Rest Functionality', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
			$httpBackend = _$httpBackend_;
			$scope = $rootScope.$new();
			$ControllerConstructor('moviesController', {$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make a get requrest when getAll is called', function() {
			$httpBackend.expectGET('/movies/').respond(200,[{title: 'The Lord of The Rings', _id:1}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.movies.length).toBe(1);
			expect($scope.movies[0].title).toBe('The Lord of The Rings');
			expect($scope.movies[0]._id).toBe(1);
		});

		it('should make a post request when create is called', function() {
			var testMovie = {title: 'Blings',};
			$scope.newMovie = testMovie;
			expect($scope.movies.length).toBe(0);
			$httpBackend.expectPOST('/movies/', testMovie).respond(200, {title: 'The Lord of The Rings', _id: 1});
			$scope.create(testMovie);
			
			$httpBackend.flush();
			expect($scope.newMovie).toBe(null);
			expect($scope.movies.length).toBe(1);
			expect($scope.movies[0].title).toBe('The Lord of The Rings');
		});

		it('should make a put request when update is called', function() {
			var movie = {_id:1, editing: true};
			$httpBackend.expectPUT('/movies/1', movie).respond(200);
			$scope.update(movie);
			$httpBackend.flush();
			expect(movie.editing).toBe(false);
		});

		it('should make a delete request when destroy is called', function() {
			var movie = {_id: 1, title: 'The Lord of The Rings'};
			$scope.movies = [{title: "Gandalf", _id: 2}, movie, {title: "Sauron", _id: 3}];
			$httpBackend.expectDELETE('/movies/1').respond(200);
			$scope.destroy(movie);
			$httpBackend.flush();
			expect($scope.movies.length).toBe(2);
			expect($scope.movies.indexOf(movie)).toBe(-1);
			expect($scope.movies[0].title).toBe('Gandalf');
			expect($scope.movies[1].title).toBe('Sauron');
		});
	});
});

// describe('movies controller', function() {
// 	it('should be true', function() {
// 		expect(true).toBe(true);
// 	});
// });