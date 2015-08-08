'use strict';

module.exports = exports = function(app) {
	require('./controllers/movies_controller.js')(app);
}