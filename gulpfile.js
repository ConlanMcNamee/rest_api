var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack')
var KarmaServer = require('karma').Server;

gulp.task('default', ['test', 'lint'], function() {});

gulp.task('test', function() {
	return gulp.src(['./test/*.js'])
						 .pipe(mocha());
});

gulp.task('lint', function() {
	return gulp.src(['*.js', 'lib/*.js'])
						 .pipe(jshint())
						 .pipe(jshint.reporter('default'));
});

gulp.task('webpack', function() {
	return gulp.src('app/js/client.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			}	
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
	return gulp.src('test/karma_tests/entry.js')
				 .pipe(webpack({
				 	output: {
				 		filename: 'test_bundle.js'
				 	}
				 }))
				 .pipe(gulp.dest('test/karma_tests/'));
});

gulp.task('copy', function() {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('karmatest',['webpack:test'], function(done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js'
	}, done).start();
})

gulp.task('build', ['webpack', 'copy']);

gulp.task('watch', function() {
	gulp.watch(['*.js', 'lib/*.js', 'test/*.js'], ['default']);
});