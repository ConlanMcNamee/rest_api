'use strict';

require('angular/angular');

var moviesApp = angular.module('moviesApp', []);

require('./movies/movie.js')(moviesApp);