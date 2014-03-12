require.config({
	baseUrl: '/',
	paths:
	{
		'jquery': 			'components/jQuery/jquery',
		'handlebars': 		'components/handlebars/handlebars',
		'emblem':			'components/emblem.js/emblem',
		'ember': 			'components/ember/ember',
		'ember-data': 		'components/ember-data-shim/ember-data',
		'bootstrap': 		'components/bootstrap-sass/dist/js/bootstrap',
		'text': 			'components/requirejs-text/text',
		'moment': 			'components/momentjs/moment',
//		'jqueryui': 		'components/jquery-ui-amd/jquery-ui-1.10.0/jqueryui',
		'pickadate': 		'components/pickadate/lib/picker',
		'pickadate-date':	'components/pickadate/lib/picker.date',
		'pickadate-time': 	'components/pickadate/lib/picker.time'
	},
	shim:
	{
		'ember':
		{
			deps: ['handlebars','jquery'],
			exports: 'Ember'
		},
		'ember-data' : ['ember']

	}
});

requirejs.onError = function (err)
{
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(
	[
		// controllers
		'app/controllers/events',
		'app/controllers/users',

		// model
		'app/models/models',
		'app/store',

		// routes
		'app/routes/application_route',
		'app/routes/index_route',
		'app/routes/events',
		'app/routes/users',

		'app/router',

		// components
		'app/components/radio-button',

		// templates
		'app/app'

	], function(){

		console.log("loaded");
	}
);


/*
require([
	'/components/jQuery/jquery.js',
	'/components/handlebars/handlebars.js',
	'/components/emblem.js/emblem.js',
	'/components/ember/ember.js',
	'/components/ember-data-shim/ember-data.js'
	]);
	*/