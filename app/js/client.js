'use strict';

require('angular/angular');

var spitsNotes = angular.module('spitsNotes', []);

var spitsController = spitsNotes.controller('spitsController', ['$scope', function($scope) {
	$scope.typing = 'hello world';
	$scope.alertTyping = function() {
		alert($scope.typing);
	};
}]);
