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
		'pickadate-time': 	'components/pickadate/lib/picker.time',
		'query': 			'components/query/query',
//		'ember-simple-auth': 'components/ember-simple-auth/ember-simple-auth',
		'ua-parser-js': 	'components/ua-parser-js/src/ua-parser.min'
	},
	shim:
	{
		'ember':
		{
			deps: ['handlebars','jquery'],
			exports: 'Ember'
		},
		'ember-data' : ['ember'],
//		'ember-simple-auth' : ['ember']
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
		'ua-parser-js',

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
		'app/components/pick-a-date',
		'app/components/pick-a-time',

		// templates
		'app/app'

	], function(){

		console.log("loaded");
		var parser = new UAParser();
		var result = parser.getResult();
		console.log(result.os.name);
		if(result.device.type == 'mobile' && result.os.name == 'iOS')
		{
			console.log("trying redirect");

			var prevLocation = window.location.href
			window.location = "fatcal://";
			window.location = prevLocation;
		}
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