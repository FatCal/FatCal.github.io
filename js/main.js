require.config({
	baseUrl: '/',
//	urlArgs: "bust=" + (new Date()).getTime(),
	paths:
	{
		'jquery': 			'components/jquery/dist/jquery',
		'handlebars': 		'components/handlebars/handlebars',
		'emblem':			'components/emblem.js/emblem',
		'ember': 			'components/ember/ember',
		'ember-data': 		'components/ember-data-shim/ember-data',
		'bootstrap': 		'components/bootstrap-sass/dist/js/bootstrap',
		'text': 			'components/requirejs-text/text',
		'moment': 			'components/momentjs/moment',
		'pickadate': 		'components/pickadate/lib/picker',
		'pickadate-date':	'components/pickadate/lib/picker.date',
		'pickadate-time': 	'components/pickadate/lib/picker.time',
		'query': 			'components/query/query',
//		'ember-simple-auth': 'components/ember-simple-auth/ember-simple-auth-0.4.0.amd.min',
//		'ember-simple-auth': 'components/ember-simple-auth/wrapper',
		'ember-simple-auth': 'js/lib/ember-simple-auth/ember-simple-auth',
		'ua-parser-js': 	'components/ua-parser-js/src/ua-parser.min',
		'jstz': 			'components/jsTimezoneDetect/jstz',
		'facebook': 		'//connect.facebook.net/en_US/all',
		'fatcal-auth':		'js/lib/auth/fatcal',
		'token-auth': 		'js/lib/auth/token',
		'foundation': 		'components/foundation/js/foundation.min',

		'pickadate-date-component': 'app/components/pick-a-date',
		'pickadate-time-component': 'app/components/pick-a-time'

	},
	deps: ['ember'],
	bundles:
	{
		'ember-simple-auth': ['ember-simple-auth/core','ember-simple-auth/session','ember-simple-auth/authenticators','ember-simple-auth/authorizers','ember-simple-auth/stores','ember-simple-auth/utils','ember-simple-auth/mixins/application_route_mixin','ember-simple-auth/mixins/authenticated_route_mixin','ember-simple-auth/mixins/authentication_route_mixin','ember-simple-auth/mixins/authentication_controller_mixin','ember-simple-auth/mixins/login_controller_mixin','ember-simple-auth/authenticators/base','ember-simple-auth/authorizers/base','ember-simple-auth/stores/base','ember-simple-auth/stores/local_storage','ember-simple-auth/stores/ephemeral','ember-simple-auth/utils/flat_objects_are_equal','ember-simple-auth/utils/is_secure_url']
	},
	shim:
	{
		'ember':
		{
			deps: ['handlebars','jquery'],
			exports: 'Ember'
		},
		'ember-data' : ['ember'],
		'ember-simple-auth' : {
			deps: ['ember']
		},
		'facebook' : {
			deps: ['jquery'],
			exports: 'FB'
		},
		'foundation' : ['jquery']
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
		'ember',
		'ember-simple-auth',
		'ua-parser-js',
		'js/lib/facebook/fb',
		'foundation',
		'fatcal-auth',
		'token-auth',

		// helpers
		'app/helpers/transforms',

		// controllers
		'app/controllers/events',
		'app/controllers/users',
		'app/controllers/dashboard',
		'app/controllers/application',
		'app/controllers/apps',

		// model
		'app/models/models',
		'app/store',

		// views
		'app/views/events',

		// routes
		'app/routes/application_route',
		'app/routes/index_route',
		'app/routes/events',
		'app/routes/users',
		'app/routes/dashboard',
		'app/routes/apps',

		'app/router',

		// components
		'app/components/radio-button',
		'pickadate-date-component',
		'pickadate-time-component',
		'delete-button',

		// app
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
			window.location = "raft://";
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