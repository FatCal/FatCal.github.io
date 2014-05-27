define
(
	[
		'app/app',
		'ember',
		'ember-simple-auth'
	],
	function(App)
	{
		App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin,{
		    // admittedly, this should be in IndexRoute and not in the
		    // top level ApplicationRoute; we're in transition... :-)
			// actions:{
			//     sessionAuthenticationSucceeded: function()	
			//     {

			//     }
			// }	
		});		
	}

);
